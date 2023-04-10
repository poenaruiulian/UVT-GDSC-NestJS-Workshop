import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";

export default function App() {

  const [title, setTitle] = useState("")
  const [artist , setArtist] = useState("")
  const [length, setLength] = useState(0)
  const [genre, setGenre] = useState("")

    //todo RENDER config pentru server
  const  addSong = async () => {
    const resp = await fetch("https://65d6-5-14-131-140.eu.ngrok.io/songs_playlists/create_song", {
      method:"POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      body: JSON.stringify({
        "title":title,
        "artist":artist,
        "length":length,
        "genre":genre
      })
    })
    console.log("Sent!")
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.texinput}
        placeholder="Song title"
        onChangeText={ text => setTitle(text)}
      />
      <TextInput
          style={styles.texinput}
          placeholder="Song artist"
          onChangeText={ text => setArtist(text)}

      />
      <TextInput
          style={styles.texinput}
          placeholder="Length of song"
          onChangeText={ text => setLength(+text)}

      />
      <TextInput
          style={styles.texinput}
          placeholder="Genre of the song"
          onChangeText={ text => setGenre(text)}

      />
      <TouchableOpacity
        style={styles.button}
        disabled={title === '' || artist === '' || length === 0 || genre === ''}
        onPress={addSong}
      >
        <Text style={{color:"white"}}>Add song</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20,
    flexDirection:"column"
  },
  texinput:{
    backgroundColor:"pink",
    width:"50%",
    height:40,
    borderRadius:10,
  },
  button:{
    backgroundColor:"gray",
    height:40,
    width:"30%",
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
