import {View,Text,StyleSheet,Image, Linking, Alert} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useState} from "react";

import redirectLocalHost from "../../redirectLocalHost"

export default function SongComponentLib({title, artist, image, redirectLink}){

    const [TITLE ,setTITLE] = useState(title.length>10 ? title.slice(0,10)+" ..." : title)
    const [ARTIST ,setARTIST] = useState(artist.length>10 ? artist.slice(0,10)+" ..." : artist)

    const [inLib, setInLib] = useState(false)


    const  addSong = async () => {

        fetch(redirectLocalHost+"/songs_playlists/songsFromLibrary")
            .then(resp=>resp.json())
            .then(res=>{
                if(res.find({
                    "title":title,
                    "artist":artist,
                    "link":redirectLink,
                    "image":image
                })){setInLib(true)}
            })

        if(inLib==false){
            const resp = await fetch(redirectLocalHost+"/songs_playlists/create_song", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    "title":title,
                    "artist":artist,
                    "link":redirectLink,
                    "image":image
                })
            })
            Alert.alert("",title+" by "+artist+" added to library!")
        }else{
            Alert.alert("","Already in library!")
        }
    }

    return(
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={styles.title}>{TITLE}</Text>
                <Text style={styles.artist}>{ARTIST}</Text>
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
        justifyContent:"center",
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

