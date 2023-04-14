import {View,Text,StyleSheet,Image, Linking, Alert} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useEffect, useState} from "react";

import redirectLocalHost from "../../redirectLocalHost"


export default function SongComponentPlaylistEdit({playlistId,songId,title, artist, image, redirectLink}){

    const [TITLE ,setTITLE] = useState(title.length>10 ? title.slice(0,10)+" ..." : title)
    const [ARTIST ,setARTIST] = useState(artist.length>10 ? artist.slice(0,10)+" ..." : artist)

    const [added, setAdded] = useState(false)

    useEffect(()=>{
        fetch(redirectLocalHost+"/songs_playlists/songsFromPlaylists/"+playlistId,{method:"GET"})
            .then(resp=>resp.json())
            .then(res=>{
                if(res.find(song=>song.id==songId)){setAdded(true)}
            }).catch(err=>console.log(err))
    })

    const  addSong = async () => {
        console.log(playlistId, songId)
        await fetch(redirectLocalHost+"/songs_playlists/updatePlaylist/"+playlistId+"/song/"+songId,{method:"PATCH"});
    }


    return(
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={styles.title}>{TITLE}</Text>
                <Text style={styles.artist}>{ARTIST}</Text>
                {
                    added == false?
                        <TouchableOpacity
                            style={styles.redirectButton}
                            onPress={()=>Alert.alert("","Add "+title+" by "+artist+" to playlist?",[
                                {
                                    text:"Cancel",
                                    style:"destructive",
                                },
                                {
                                    text:"Add",
                                    style:"default",
                                    onPress: ()=>{
                                        addSong()
                                        setAdded(true)
                                    }
                                }
                            ])}
                        >
                            <Text style={{color:"white",fontWeight:"bold"}}>Add to playlist</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={[styles.redirectButton,{backgroundColor: "#97DEFF"}]}
                        >
                            <Text style={{color:"white",fontWeight:"bold"}}>Added</Text>
                        </TouchableOpacity>


                }

            </View>
            <View style={styles.button}>
                <TouchableOpacity

                    onPressOut={()=>Alert.alert("Redirect","Do you want to see more details about the song?",[
                        {
                            text:"Cancel",
                            style:"destructive"
                        },
                        {
                            text:"Sure",
                            style:"default",
                            onPress:()=>Linking.openURL(redirectLink)
                        }
                    ])}
                >
                    <Image source={require("../../images/shazam.png")} style={{height:40,width:40}}/>
                </TouchableOpacity>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    image:{
        height:100,
        width:"30%",
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    container:{
        width:"90%",
        flexDirection:"row",
        gap:10,
        height:100,
        backgroundColor:"#C9EEFF",
        borderRadius:10
    },
    details:{
        width:"40%",
        flexDirection:"column",
        gap:5,
        padding:10
    },
    button:{
        width:"20%",
        alignItems:"center",
        justifyContent:"center",
        height:"100%"
    },
    redirectButton:{
        backgroundColor:"#AA77FF",
        height:"60%",
        alignItems:"center",
        borderRadius:10,
        padding:5
    },
    title:{
        fontSize:16,
        fontWeight:"bold"
    },
    artist:{
        fontSize:14,
    }
})

