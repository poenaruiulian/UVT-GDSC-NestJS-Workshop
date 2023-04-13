import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Alert, Keyboard} from 'react-native';
import {useState} from "react";
import Spacer from "../Helpers/Spacer";
import redirectLocalHost from "../../redirectLocalHost";
import SongComponentPlaylist from "../Helpers/SongComponentPlaylist";

export default function Playlists() {

    const [createPlaylist , setCreatePlaylist] = useState(false)
    const [showSongs, setShowSongs] = useState(false)
    const [arrow, setArrow] = useState("down")

    const [playlistName, setPlaylistName] = useState("")
    const [librarySongs, setLibrarySongs] = useState([])
    const [newPlaylistSongs , setNewPlaylistSongs] = useState([])

    const getSongsFromLibrary = async () =>{
         await fetch(redirectLocalHost+"/songs_playlists/songsFromLibrary",{method:"GET",})
            .then(resp=>resp.json())
            .then(res=> {
                setLibrarySongs(res)
            })
    }

    const addPlaylistToDB = async () =>{
         await fetch(redirectLocalHost+"/songs_playlists/create_playlist",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                "name":playlistName,
                "songs":newPlaylistSongs
            })
        })
    }

    return (
        <View style={styles.container}>
            <Spacer height={2}/>


            {
                createPlaylist==false?
                    <View style={styles.playlistScreen}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                style={styles.createBtn}
                                onPress={()=> {
                                    setCreatePlaylist(true)
                                    getSongsFromLibrary()
                                }}
                            >
                                <Text  style={{fontWeight:"bold",color:"white"}}>Create playlist!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                :
                    <View style={styles.createForm}>
                        <TouchableOpacity
                            onPress={()=>
                                Alert.alert(
                                    "Cancel?",
                                    "Are you sure you want to cancel the creation of this playlist?",
                                    [
                                        {
                                            text:"Yes",
                                            style:"destructive",
                                            onPress:()=>setCreatePlaylist(false)
                                        },
                                        {
                                            text:"No",
                                            style:"default",
                                        }
                                    ]
                                )
                            }
                        >
                            <Image source={require("../../images/cancel.png")} style={{height:40,width:40}}/>
                        </TouchableOpacity>
                        <Spacer height={30}/>
                        <TextInput
                            //value={playlistName}
                            style={styles.textInput}
                            placeholder={"Playlist name"}
                            textAlign={"center"}
                            onChangeText = {text=>setPlaylistName(text)}
                        />
                        <Spacer height={30}/>
                        <View style={{width:"100%",flexDirection: "row",gap:10,alignItems:"center",justifyContent: "center"}}>
                            <Text style={{fontWeight:"bold",fontSize:20}}>Select songs</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    if(showSongs==false){
                                        setShowSongs(true)
                                        setArrow("up")
                                    }
                                    else{
                                        setShowSongs(false)
                                        setArrow("down")
                                    }
                                }
                                }
                            >
                                {
                                    arrow==="down"?
                                        <Image source={require("../../images/down.png")} style={{height:20,width:20}} />
                                        :
                                        <Image source={require("../../images/up.png")} style={{height:20,width:20}} />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            showSongs?
                                <View style={{width:"100%",alignItems:"center",height:"100%"}}>
                                    <Spacer height={10}/>
                                    <ScrollView
                                        contentContainerStyle={styles.scrollView}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {
                                            librarySongs.map(song=>{
                                                return(
                                                    <View style={{width:"100%"}}>
                                                        <SongComponentPlaylist
                                                            newPlaylist={newPlaylistSongs}
                                                            setNewPlaylist={setNewPlaylistSongs}
                                                            id={song.id}
                                                            title={song.title}
                                                            artist={song.artist}
                                                            image={song.image}
                                                            redirectLink={song.link}/>
                                                        <Spacer height={30}/>
                                                    </View>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                    <Spacer height={200}/>
                                </View>:
                                <Text></Text>
                        }

                        <TouchableOpacity
                            style={styles.createBtn}
                            onPress={()=>{
                                if(playlistName === ""){
                                    alert("Add a name to your playlist!")
                                }else{
                                    console.log(playlistName)
                                    console.log(newPlaylistSongs)
                                    addPlaylistToDB()
                                    setCreatePlaylist(false)
                                    alert("Playlist "+playlistName+" created with success!")
                                    setPlaylistName("")
                                    setNewPlaylistSongs([])
                                    Keyboard.dismiss()
                                }

                            }
                            }
                        >
                            <Text   style={{fontWeight:"bold",color:"white"}}>Create!</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap:20,
        flexDirection:"column"
    },
    header:{
        width:"100%",
        alignItems:"center"
    },
    createBtn:{
        width:"54%",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#AA77FF",
        borderRadius:10,
    },
    playlistScreen:{
      width:"100%",
    },
    createForm:{
        width:"100%",
        alignItems:"center",
        height:"100%"
    },
    textInput:{
        backgroundColor:"#D3E0EA",
        width:"80%",
        height:40,
        borderRadius:10,
    },
    scrollView:{
        width:"100%",
        alignItems:"center"
    },


});
