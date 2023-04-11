import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Keyboard, ScrollView} from 'react-native';
import {useState} from "react";


import Spacer from "../Helpers/Spacer";
import SongComponent from "../Helpers/SongComponent";

export default function Songs() {

    const [searchText, setSearchText] = useState("")
    const [searchedSongs, setSearchedSongs] = useState([])
    const [isGettingSong, setIsGettingSong] = useState(false)

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
                resp.tracks.hits.map( s => {
                    songs.push([s.track.title,
                        s.track.subtitle,
                        s.track.images.coverart,
                        s.track.url])
                })
                //console.log(songs)
                setSearchedSongs(songs)
                setIsGettingImage(false)
            })

    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Spacer height={2}/>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.textInput}
                    textAlign={"center"}
                    placeholder={"Add another song ..."}
                    onChangeText={(text)=>setSearchText(text)}
                />
                <TouchableOpacity
                    onPress={()=>{
                        searchAnotherSong(searchText,setIsGettingSong,setSearchedSongs)
                        setIsGettingSong(true)
                        Keyboard.dismiss()
                    }}
                >
                    <Image source={require("../../images/search.png")} style={{height:40,width:40}}/>
                </TouchableOpacity>
            </View>


            {searchedSongs.length==0 && isGettingSong==false?
                <View>
                    <Text>Songs in your library</Text>
                </View>
                :
                isGettingSong == true ?
                    <View>
                        <Text>Try clicking again without changing your search text</Text>
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
                                        <SongComponent  title={song[0]} artist={song[1]} image={song[2]} redirectLink={song[3]} />
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
    },
    searchContainer:{
        width:"90%",
        flexDirection:"row",
        gap:"10%"
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
    }
});
