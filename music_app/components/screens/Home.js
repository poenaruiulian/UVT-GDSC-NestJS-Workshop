import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useState} from "react";

export default function Home() {


    return (
        <View style={styles.container}>
            <Text>Home</Text>
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
