import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'

//other
import mainHeader from '../components/main.header';

//Screens
import LibraryScreen from '../screens/library/library';

const LibraryStack = createStackNavigator()
const LibraryStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <LibraryStack.Navigator initialRouteName="LibraryStack"
                screenOptions={{
                    headerShown: true
                }}>

                <LibraryStack.Screen
                    name="[LibraryStackNavigator] LibraryScreen"
                    options={mainHeader()}
                    component={LibraryScreen}
                />
            </LibraryStack.Navigator>
        </SafeAreaProvider>
    )
}

export default LibraryStackNavigator