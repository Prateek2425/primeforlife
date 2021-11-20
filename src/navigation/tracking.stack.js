import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'

//other
import mainHeader from '../components/main.header';

//Screens
import TrackingScreen from '../screens/tracking';

const TrackingStack = createStackNavigator()
const TrackingStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <TrackingStack.Navigator initialRouteName="TrackingStack"
                screenOptions={{
                    headerShown: true
                }}>

                <TrackingStack.Screen
                    name="[TrackingStackNavigator] TrackingScreen"
                    options={mainHeader()}
                    component={TrackingScreen}
                />
            </TrackingStack.Navigator>
        </SafeAreaProvider>
    )
}

export default TrackingStackNavigator