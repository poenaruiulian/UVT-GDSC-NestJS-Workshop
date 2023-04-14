import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    Image,
    Alert,
    Keyboard,
    RefreshControl,
} from 'react-native';
import {useEffect, useState} from "react";
import Spacer from "../Helpers/Spacer";
import redirectLocalHost from "../../redirectLocalHost";
import SongComponentPlaylist from "../Helpers/SongComponentPlaylist";
import PlaylistComponent from "../Helpers/PlaylistComponent";
import SongComponentDel from "../Helpers/SongComponentDel";
import SongComponentPlaylistEdit from "../Helpers/SongComponentEdit";

export default function Playlists() {

    const [onePlaylist, setOnePlaylist ] = useState(false)
    const [info, setInfo] = useState({})
    const [addSong, setAddSong] = useState(false)

    const [libPlaylist, setLibPlaylist] = useState([])

    const [createPlaylist , setCreatePlaylist] = useState(false)
    const [showSongs, setShowSongs] = useState(false)
    const [arrow, setArrow] = useState("down")

    const [playlistName, setPlaylistName] = useState("")
    const [librarySongs, setLibrarySongs] = useState([])
    const [newPlaylistSongs , setNewPlaylistSongs] = useState([])

    useEffect(()=>{
        const getPlaylists = async () =>{
            try{
                const response = await fetch(redirectLocalHost+"/songs_playlists/avalible_playlists", {method: "GET",})
                const json = await response.json()
                console.log(json)
                setLibPlaylist(json.reverse())
            }catch (err){
                console.log(err);
            }
        }

        getPlaylists()
    },[])

    const getSongsFromLibrary = async () =>{
        const fetchData = async () => {
            try{
                const response = await fetch(redirectLocalHost + "/songs_playlists/songsFromLibrary", {method: "GET",})
                const json = await response.json()
                setLibrarySongs(json.reverse())

            }catch (err){console.log(err+" lib")}
        }

        fetchData()
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
        }).catch(err=>console.log(err))
    }

    return (

            onePlaylist==false?
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
                            <Spacer heigh={30}/>

                            <Text  style={{fontWeight:"bold",fontSize:20}}>Your playlist library:</Text>
                            <Spacer height={30}/>

                            <ScrollView
                                contentContainerStyle={styles.scrollView}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl onRefresh={()=>{
                                        const getPlaylists = async () =>{
                                            try{
                                                const response = await fetch(redirectLocalHost+"/songs_playlists/avalible_playlists", {method: "GET",})
                                                const json = await response.json()
                                                console.log(json)
                                                setLibPlaylist(json.reverse())
                                            }catch (err){
                                                console.log(err);
                                            }
                                        }

                                        getPlaylists()
                                    }
                                    }/>
                                }
                            >

                                {
                                    libPlaylist.length == 0?
                                        <Text>Refresh?</Text>
                                        :
                                        libPlaylist.map(playlist=>{
                                            return(
                                                <View style={{width:"100%"}}>
                                                    <PlaylistComponent setOnePlaylist={setOnePlaylist} setInfo={setInfo} title={playlist.playlist} id={playlist.id} songs={playlist.songs}/>
                                                    <Spacer height={30}/>
                                                </View>
                                            )
                                        })
                                }
                            </ScrollView>
                            <Spacer height={30}/>

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
                                            refreshControl={
                                            <RefreshControl onRefresh={()=>{
                                                const fetchData = async () => {
                                                    try{
                                                        const response = await fetch(redirectLocalHost + "/songs_playlists/songsFromLibrary", {method: "GET",})
                                                        const json = await response.json()
                                                        setLibrarySongs(json.reverse())

                                                    }catch (err){console.log(err+" lib")}
                                                }

                                                fetchData()
                                            }
                                            }/>
                                            }
                                        >
                                            {
                                                librarySongs.length == 0?
                                                    <Text>Refresh?</Text>
                                                    :
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
            :
                addSong == false?
                    <View style={styles.container}>
                    <Spacer height={2}/>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={()=>setOnePlaylist(false)}
                            style={styles.createBtn}
                        >
                            <Text style={{color:"white",fontWeight:"bold"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl onRefresh={()=>{
                                const getPlaylistSongs = async () =>{
                                    await fetch(redirectLocalHost+"/songs_playlists/songsFromPlaylists/"+info.id)
                                        .then(response=>response.json())
                                        .then(resp=>{
                                            console.log(resp)
                                            setInfo({
                                                title:info.title,
                                                id:info.id,
                                                songs:resp
                                            })

                                        }).catch(err=>console.log(err))
                                }
                                getPlaylistSongs().catch(err=>console.log(err))
                            }}/>
                        }
                    >


                        <Image source={require("../../images/playlist.jpg")} style={{height:300,width:300}}/>
                        <Spacer height={30}/>
                        <Text style={{fontWeight:"bold", fontSize:24}}>{info.title}</Text>
                        <Spacer height={10}/>
                        <TouchableOpacity
                            style={[styles.createBtn,{backgroundColor: "#98D8AA"}]}
                            onPress={()=> {
                                setAddSong(true)
                                getSongsFromLibrary()
                            }}
                        >
                            <Text style={{color:"white",fontWeight:"bold", padding:5}}>Add songs</Text>
                        </TouchableOpacity>
                        <Spacer height={30}/>
                        {
                            info.songs.length == 0?
                                <Text>Refresh?</Text>
                                :
                                info.songs.reverse().map(song=>{
                                    return(
                                        <View style={{width:"100%"}}>
                                            <SongComponentDel playlistId={info.id} songId={song.id} title={song.title} artist={song.artist} image={song.image} redirectLink={song.link}/>
                                            <Spacer height={30}/>
                                        </View>
                                    )
                                })
                        }
                    </ScrollView>

                </View>
                :
                    <View style={styles.container}>
                        <Spacer height={2}/>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={()=>setAddSong(false)}
                                style={styles.createBtn}
                            >
                                <Text style={{color:"white",fontWeight:"bold"}}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        {/*<Spacer heigth={10}/>*/}
                        <Text style={{fontWeight:"bold", fontSize:24}}>{info.title}</Text>
                        <Spacer height={30}/>
                        <ScrollView
                            contentContainerStyle={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl onRefresh={()=>{getSongsFromLibrary()}}/>
                            }
                        >
                            {
                                librarySongs.length == 0 ? <Text>Refresh?</Text>
                                    :
                                    librarySongs.map(song=>{
                                        return(
                                            <View>
                                                <SongComponentPlaylistEdit title={song.title} artist={song.artist} redirectLink={song.length} image={song.image} songId={song.id} playlistId={info.id}/>
                                                <Spacer height={30}/>
                                            </View>
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        gap:20,
        flexDirection:"column",
        width:"100%"
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
        alignItems:"center",
        height:"100%"
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
