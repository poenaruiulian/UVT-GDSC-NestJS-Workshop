import {View,Text,StyleSheet,Image, Linking, Alert} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {useState} from "react";

export default function SongComponent({title, artist, image, redirectLink}){

    const [TITLE ,setTITLE] = useState(title.length>10 ? title.slice(0,10)+" ..." : title)


    const  addSong = async () => {
        const resp = await fetch("https://9165-2a02-2f09-360c-b600-1c7e-4fc7-909e-ff13.eu.ngrok.io/songs_playlists/create_song", {
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
    }

    return(
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={styles.title}>{TITLE}</Text>
                <Text style={styles.artist}>{artist}</Text>
                <TouchableOpacity
                    style={styles.redirectButton}
                    onPress={()=>Alert.alert("","Add "+title+" by "+artist+" to library?",[
                        {
                            text:"Cancel",
                            style:"destructive",
                        },
                        {
                            text:"Add",
                            style:"default",
                            onPress:addSong
                        }
                        ])}
                >
                    <Text style={{color:"white"}}>Add to library</Text>
                </TouchableOpacity>
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
        gap:10,
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
    }
})

