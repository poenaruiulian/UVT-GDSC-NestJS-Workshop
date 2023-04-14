import {Text, View, Image, TouchableOpacity,StyleSheet} from "react-native";
import Spacer from "./Spacer";
import {useState} from "react";
import redirectLocalHost from "../../redirectLocalHost";

export default function PlaylistComponent({id,title,songs, setOnePlaylist, setInfo}){

    const [songToShow, setSongToShow] = useState(songs.join(", ").slice(0,24)+"...")
    const [playlistSongs, setPlaylistSongs] = useState([])

    const getPlaylistSongs = async () =>{
        await fetch(redirectLocalHost+"/songs_playlists/songsFromPlaylists/"+id)
            .then(response=>response.json())
            .then(resp=>{
                console.log(resp)
                setPlaylistSongs(resp)
            })
    }

    return(
        <View style={styles.container}>
            <View style={styles.description}>
               <View style={styles.imageContainer}>
                   <Image  source={require("../../images/playlist.jpg")} style={styles.image} />
               </View>
                <View style={styles.details}>
                    <Text style={{fontSize:24,fontWeight:"bold"}}>{title}</Text>
                    <Spacer height={10}/>
                    <Text style={{fontSize:16}}>{songToShow}</Text>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{
                        getPlaylistSongs()
                        setInfo({
                            title:title,
                            id:id,
                            songs: playlistSongs
                        })

                        setOnePlaylist(true)
                    }}
                >
                    <Text style={{padding: 8,color:"white",fontWeight:"bold"}}>Show more...</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#C9EEFF",
        width:"85%",
        height:180,
        borderRadius:10
    },
    description:{
        width:"100%",
        height:"70%",
        flexDirection:"row",
        gap:20
    },
    details:{
        width:"50%",
        padding:10

    },
    imageContainer:{
        height:"100%",
        width:"50%",
    },
    image:{
        height:"100%",
        width:150,
        paddingLeft:10,
        borderTopLeftRadius:10,

    },
    btnContainer:{
        height:"30%",
        justifyContent:"center",
        alignItems:"center"
    },
    btn:{
        width:"40%",
        alignItems:"center",
        backgroundColor:"#AA77FF",
        borderRadius:10
    }
})