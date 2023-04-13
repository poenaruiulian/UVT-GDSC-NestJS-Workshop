import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Keyboard,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import {useEffect, useState} from "react";


import Spacer from "../Helpers/Spacer";
import SongComponent from "../Helpers/SongComponent";
import SongComponentLib from "../Helpers/SongComponentLib";
import redirectLocalHost from "../../redirectLocalHost"

export default function Songs() {

    const [searchText, setSearchText] = useState("")
    const [searchedSongs, setSearchedSongs] = useState([])
    const [isGettingSong, setIsGettingSong] = useState(false)
    const [library,setLibrary] = useState([])


    useEffect(()=>{
        fetch(redirectLocalHost+"/songs_playlists/songsFromLibrary",{method:"GET",})
            .then(resp=>resp.json())
            .then(res=> {
                setLibrary(res)
            })
    })



    const searchAnotherSong = (searchedItem,setIsGettingImage,setSearchedSongs) => {

        searchedItem = searchedItem.split(" ").join("%20")
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b8ba518e6cmshe3cb4615a40d2d9p1214aejsnad02932bd6b6',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        fetch('https://shazam.p.rapidapi.com/search?term='+searchedItem+'&locale=en-US&offset=0&limit=5', options)
            .then(resp => resp.json())
            .then(resp => {
                let songs = []
                if(resp.tracks === undefined){alert("No song with this name, try another one")}
                else{
                    resp.tracks.hits.map( s => {
                        if(library.find(r=> r.title == s.track.title && r.artist === s.track.subtitle)){
                            console.log("hello")
                        }else{
                            songs.push([s.track.title,
                                s.track.subtitle,
                                s.track.images.coverart,
                                s.track.url])
                        }

                    })
                    //console.log(songs)
                    setSearchedSongs(songs)
                    setIsGettingImage(false)
                }
            })

    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Spacer height={2}/>

            <View style={styles.searchContainer}>
                <TextInput
                    value={searchText}
                    style={styles.textInput}
                    textAlign={"center"}
                    placeholder={"Add another song ..."}
                    onChangeText={(text)=>setSearchText(text)}
                />
                <TouchableOpacity
                    disabled={searchText === ""}
                    onPress={()=>{
                        searchAnotherSong(searchText,setIsGettingSong,setSearchedSongs)
                        setIsGettingSong(true)
                        Keyboard.dismiss()
                    }}
                >
                    <Image source={require("../../images/search.png")} style={{height:40,width:40}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.clearSearch}>
                {
                    searchedSongs.length !==0 ?
                        <TouchableOpacity
                            onPress={()=>{
                                setSearchedSongs([])
                                setSearchText("")
                                Keyboard.dismiss()
                            }}
                            style={styles.clearButton}
                        >
                            <Text style={{fontWeight:"bold",color:"white"}}>Clear page!</Text>
                        </TouchableOpacity>:
                        <Text></Text>
                }
            </View>


            {searchedSongs.length===0 && isGettingSong===false?
                <View style={styles.library}>
                    <Text style={{fontWeight:"bold",fontSize:24}}>Songs in your library</Text>
                    <Spacer height={20}/>

                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            library.map(song=>{
                                return(
                                    <View style={{width:"100%"}}>
                                        <SongComponentLib key={song.id} title={song.title} artist={song.artist} image={song.image} redirectLink={song.link} />
                                        <Spacer height={30}/>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                    <Spacer height={120}/>
                </View>
                :
                isGettingSong === true ?
                    <View>
                        <ActivityIndicator size={"large"}/>
                    </View>
                    :
                    <ScrollView
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        {
                            searchedSongs.map(song=>{
                                return(
                                    <View style={{width:"100%"}}>
                                        <SongComponent key={song[1]} title={song[0]} artist={song[1]} image={song[2]} redirectLink={song[3]} />
                                        <Spacer height={30}/>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
        gap:20,
        flexDirection:"column",
        width:"100%",
    },
    searchContainer:{
        width:"90%",
        flexDirection:"row",
        gap:"10%",
        height:"5%"
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
    clearSearch:{
        width:"100%",
        alignItems:"center"
    },
    clearButton:{
        width:"54%",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#AA77FF",
        borderRadius:10,
    },
    library:{
        width:"100%",
        alignItems:"center",
        height:"100%"
    }

});
