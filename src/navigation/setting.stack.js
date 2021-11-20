import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'

//other
import mainHeader from '../components/main.header';

//Screens
import SettingScreen from '../screens/settings/setting';
import EditProfile from '../screens/settings/edit-profile'
import ChangePassword from '../screens/settings/change-password'

const SettingStack = createStackNavigator()
const SettingStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <SettingStack.Navigator initialRouteName="SettingStack"
                screenOptions={{
                    headerShown: true
                }}>

                <SettingStack.Screen
                    name="[SettingStackNavigator] SettingScreen"
                    options={mainHeader()}
                    component={SettingScreen}
                />
                <SettingStack.Screen
                    name="[SettingStackNavigator] EditProfile"
                    options={mainHeader()}
                    component={EditProfile}
                />
                <SettingStack.Screen
                    name="[SettingStackNavigator] ChangePassword"
                    options={mainHeader()}
                    component={ChangePassword}
                />
            </SettingStack.Navigator>
        </SafeAreaProvider>
    )
}

export default SettingStackNavigator