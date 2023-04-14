import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AppNavigation from "./components/AppNavigation";

const Stack = createNativeStackNavigator()
//todo cannot create an empty playlist
//todo some json parse warning
export default function App(){

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown:false}} name={"AppNavigation"} component={AppNavigation}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}