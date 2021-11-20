import React, { useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Image,
    SafeAreaView
} from 'react-native'
import { View, Text, Button, Divider } from '@shoutem/ui'
import { KeyboardAvoidContainer } from '../../components/keyboard.avoid.container'
import { pflCOLORS, globalStyles } from '../../styles/themes.styles'
// import {useOnboarding} from 'components/hooks/onboard.hooks'
import { Auth } from 'aws-amplify'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../components/Logo'
import { actions, reducer, sliceKey } from '../../shared-redux/auth/slice';
import { authSaga } from '../../shared-redux/auth/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Toast from 'react-native-toast-message';

const Signup = () => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: authSaga });

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    //   const onboard = useOnboarding()
    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const handleChange = (feild, value) => {
        let tempUSer = { ...user }
        tempUSer[feild] = value
        setUser(tempUSer)
    }

    const goToLogin = () => {
        navigation.goBack()
    }

    const toForgotPassword = () => {
        navigation.navigate('[AuthNavigator] ForgotPassword')
    }

    const onRegister = () => {
        dispatch({
            type: actions.registerUser.type,
            payload: {
                user: { ...user },
                successCallback: (data) => {
                    navigation.navigate('[AuthNavigator] Verify', {username : data.username, password: data.password})
                },
                errorCallback: (err) => {
                    navigation.navigate('[AuthNavigator] Verify', {username : 'data.username', password: 'data.password'})
                
                    Toast.show({
                        text1: err.message,
                        type: 'error',
                        autoHide: true
                      });
                }
            }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <KeyboardAvoidContainer>
                    <Divider />
                    <Logo styleName="horizontal h-center" />

                    <View styleName="md-gutter-vertical lg-gutter-horizontal">
                        <Text styleName="h-center" />
                    </View>
                    <TextInput
                        value={(user.email ? user.email : '')}
                        keyboardType="email-address"
                        style={[styles.input, styles.topInput]}
                        onChangeText={(val) => handleChange('email', val)}
                        placeholder="Email"
                        maxLength={100}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <View>
                        <TextInput
                            // secureTextEntry={!show}
                            value={(user.name ? user.name : '')}
                            onChangeText={(val) => handleChange('name', val)}
                            style={[styles.input, styles.middleInput]}
                            placeholder="Name"
                        />
                    </View>
                    <View styleName="h-center">
                        <TextInput
                            value={(user.password ? user.password : '')}
                            onChangeText={(val) => handleChange('password', val)}
                            secureTextEntry={!show}
                            style={[styles.input, styles.middleInput]}
                            placeholder="Password"
                        />
                        {/* <View>
                            <TouchableOpacity onPress={toggleShow}>
                                {!show ? (
                                    <Text>show</Text>
                                ) : (
                                    <Text>hide</Text>
                                )}
                            </TouchableOpacity>
                        </View> */}
                    </View>

                    <View>
                        <TextInput
                            value={(user.confirmPassword ? user.confirmPassword : '')}
                            onChangeText={(val) => handleChange('confirmPassword', val)}
                            secureTextEntry={!show}
                            style={[styles.input, styles.bottomInput]}
                            placeholder="Confirm Password"
                        />
                    </View>
                    <View styleName="md-gutter h-center">
                        <Button onPress={onRegister} styles={[{ ...globalStyles.button }, { backgroundColor: 'red' }]} >
                            <Text styleName="white button-text">Register</Text>
                        </Button>
                    </View>
                    <Divider />
                </KeyboardAvoidContainer>
                <View styleName="md-gutter h-center" style={styles.button}>
                    <View styleName="h-center v-center horizontal lg-gutter">
                        <View style={styles.line} />
                        <Text styleName="text-center">OR</Text>
                        <View style={styles.line} />
                    </View>
                    <Divider />
                    <Button
                        styleName="main"
                        style={[styles.innerbutton, { ...styles.button }]}
                        onPress={goToLogin}>
                        <Text style={{ color: 'white' }}>Already have an Account? Go to login.</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('screen').width
    },
    innerbutton: {
        backgroundColor: pflCOLORS.blue
    },
    topInput: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5
    },
    middleInput: {
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5
    },
    bottomInput: {
        borderWidth: 0.5,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },

    input: {
        width: '100%',
        fontSize: 15,
        color: 'darkgrey',
        fontFamily: 'Helvetica Neue',
        backgroundColor: 'white',
        padding: 15
    },
    image: { resizeMode: 'contain', height: 60, width: 60 },
    line: {
        width: 80,
        margin: 10,
        height: 1,
        backgroundColor: '#00000070'
    }
})

export default Signup