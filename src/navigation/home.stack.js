import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'

//other
import mainHeader from '../components/main.header';

//Screens
import HomeScreen from '../screens/home/home';

const CoachStack = createStackNavigator()
const CoachStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <CoachStack.Navigator initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: true
                }}>
                <CoachStack.Screen
                    options={mainHeader()}
                    name="[CoachStackNavigator] HomeScreen"
                    component={HomeScreen}
                />
            </CoachStack.Navigator>
        </SafeAreaProvider>
    )
}

export default CoachStackNavigator