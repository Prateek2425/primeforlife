import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';
import VerifyOTP from '../screens/auth/verify-otp';
import ForgotPassword from '../screens/auth/forgot-password';
import ResetPassword from '../screens/auth/reset-password';
import OnboardingVideo from '../screens/auth/onboard-video';
import mainHeader from '../components/main.header';

const OnboardingStack = createStackNavigator()
const AuthStackNavigator = () => {
    return (
        <SafeAreaProvider>
            <OnboardingStack.Navigator initialRouteName="IntroVideo"
                screenOptions={{
                    headerShown: false
                }}>

                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] IntroVideo"
                    component={OnboardingVideo}
                />

                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] Signup"
                    component={Signup}
                />
                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] Verify"
                    component={VerifyOTP}
                />

                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] Login"
                    component={Login}
                />

                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] ForgotPassword"
                    component={ForgotPassword}
                />

                <OnboardingStack.Screen
                    options={mainHeader()}
                    name="[AuthNavigator] ResetPassword"
                    component={ResetPassword}
                />


            </OnboardingStack.Navigator>
        </SafeAreaProvider>
    )
}

export default AuthStackNavigator