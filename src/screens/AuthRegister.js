import React from 'react';
import {useForm, Controller} from "react-hook-form";
import { View, StyleSheet, TextInput, SafeAreaView, Text,  Button } from 'react-native'
import { Auth } from 'aws-amplify';
import Logo from '../components/Logo';
import {useNavigation} from '@react-navigation/native';


async function signUp(data) {
    try {
        const { user } = await Auth.signUp({
            username: data.email,
            password: data.password,
            attributes: {
                email: data.email,          
                name: data.name,   
            }
        });
        // let user = data;
        // console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

const AuthRegister = () => {
    const navigation = useNavigation();

    const {control, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        signUp(data);
    };

    return (
            <SafeAreaView style={styles.container}>
                <View style = {styles.logoContainer}>
                    <Logo />
                </View>
                
                {/* First Name Field */}
                <View style={styles.formContainer}>
                <Text style={styles.title}>
                        First Name (what your friends call you!):
                    </Text>
                <Controller
                    control = {control}
                    rules = {{
                        required: true,
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            style={styles.text}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value={value}
                        />
                    )} 
                    name = "firstName"
                    defaultValue = ""
                />


                {/* E-mail field */}

                <Text style={styles.title}>
                    E-mail address (We never send spam)
                </Text>
                <Controller 
                    control = {control}
                    rules = {{
                        required: true,
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            style={styles.text}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value={value}
                        />
                    )} 
                    name = "email"
                    defaultValue = ""
                />

                {/* Password field */}

                <Text style={styles.title}>
                    Password (at least 8 characters)
                </Text>
                <Controller 
                    control = {control}
                    rules = {{
                        required: true,
                    }}
                    render = {({field: {onChange, onBlur, value}}) => (
                        <TextInput 
                            style={styles.text}
                            onBlur = {onBlur}
                            onChangeText = {onChange}
                            value={value}
                            secureTextEntry = {true}
                        />
                    )} 
                    name = "password"
                    defaultValue = ""
                />

                <Button title="Back" onPress = {navigation.goBack()}/>
                <Button title="Sign Up" onPress = {handleSubmit(onSubmit)}/>
                </View>
                
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logoContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 10,
    },
    formContainer: {
        flex: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        margin : 8
    },
    text: {
        width: '90%',
        height: 44
    }
})

export default AuthRegister

