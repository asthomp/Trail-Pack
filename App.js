import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
import {PaperProvider} from "react-native-paper";
import Front from "./views/front";
import Details from "./views/details";

export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Front">
                    <Stack.Screen name="Front" component={Front}/>
                    <Stack.Screen name="Details" component={Details}/>
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
