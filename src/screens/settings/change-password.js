import React, { useState } from 'react'
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    SafeAreaView
} from 'react-native'
import { View, Text, Divider, TextInput, Title, Button } from '@shoutem/ui'
import { KeyboardAvoidContainer } from '../../components/keyboard.avoid.container'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { actions, reducer, sliceKey } from '../../shared-redux/auth/slice';
import { authSaga } from '../../shared-redux/auth/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Toast from 'react-native-toast-message';
import { globalStyles } from "../../styles/themes.styles"

const ChangePassword = () => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: authSaga });

    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const handleChange = (feild, value) => {
        let tempUSer = { ...user }
        tempUSer[feild] = value
        setUser(tempUSer)
    }

    const onChangePassword = () => {
        dispatch({
            type: actions.changePassword.type,
            payload: {
                user: { ...user },
                successCallback: (data) => {
                    Toast.show({
                        text1: "Password reset successfully",
                        type: 'success',
                        autoHide: true
                    });
                    navigation.goBack()
                },
                errorCallback: (err) => {
                    console.log("errrrr =", err)
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
                    <Title style={styles.title}>Change Password</Title>
                    <View styleName="md-gutter-vertical lg-gutter-horizontal">
                        <Text styleName="h-center" />
                    </View>

                    <View>
                        <TextInput
                            value={(user.oldPassword ? user.oldPassword : '')}
                            onChangeText={(val) => handleChange('oldPassword', val)}
                            style={styles.input}
                            placeholder="Old Password"
                        />
                    </View>
                    <View styleName="h-center">
                        <TextInput
                            value={(user.password ? user.password : '')}
                            onChangeText={(val) => handleChange('password', val)}
                            secureTextEntry={show}
                            style={styles.input}
                            placeholder="New Password"
                        />

                    </View>

                    <View>
                        <TextInput
                            value={(user.confirmPassword ? user.confirmPassword : '')}
                            onChangeText={(val) => handleChange('confirmPassword', val)}
                            secureTextEntry={show}
                            style={styles.input}
                            placeholder="Confirm Password"
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button style={[{ ...globalStyles.button }, { borderColor: '#aaa' }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonTitle}>Cancel</Text>
                        </Button >
                        <Button style={[{ ...globalStyles.button }, { borderColor: '#aaa' }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonTitle}>Reset</Text>
                        </Button >
                    </View>
                    <Divider />
                </KeyboardAvoidContainer>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 5
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    },
    buttonTitle: {
        fontSize: 20,
        width: 120,
        textAlign: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('screen').width
    },
    image: { resizeMode: 'contain', height: 60, width: 60 },
    line: {
        width: 80,
        margin: 10,
        height: 1,
        backgroundColor: '#00000070'
    },
    updateButton: {
        backgroundColor: '#e26a00',
        borderRadius: 5,
        color: '#fff',
        fontSize: 16,
        overflow: 'hidden',
        padding: 5,
        width: (Dimensions.get('window').width / 2) - 30,
        textAlign: 'center',
        paddingVertical: 10,
        margin: 5
    },
    cancelButton: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        color: '#fff',
        fontSize: 16,
        overflow: 'hidden',
        padding: 5,
        width: (Dimensions.get('window').width / 2) - 30,
        textAlign: 'center',
        color: '#000',
        paddingVertical: 10,
        margin: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        // TODO: Fix this justifyContent to space between buttons
    },
})

export default ChangePassword