import { StatusBar } from 'expo-status-bar';
import {createDrawerNavigator} from "@react-navigation/drawer";
import Songs from "./screens/Songs";
import Playlists from "./screens/Playlists";

const Drawer = createDrawerNavigator()

export default function AppNavigation(){

    return (
        <Drawer.Navigator>
            <Drawer.Screen name={"Songs"} component={Songs}/>
            <Drawer.Screen name={"Playlists"} component={Playlists}/>
        </Drawer.Navigator>
    )

}