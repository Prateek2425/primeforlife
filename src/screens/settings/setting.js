import React from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { View, Text } from '@shoutem/ui'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message';

import { actions, reducer, sliceKey } from '../../shared-redux/auth/slice';
import { authSaga } from '../../shared-redux/auth/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

const SettingScreen = () => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: authSaga });
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onSignOut = async () => {
        Alert.alert(
            "Wait!",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        Toast.show({
                            text1: "Loggin out..",
                            autoHide: true,
                            type: "success"
                        })
                        dispatch({
                            type: actions.logout.type,
                            payload: {
                                errorCallback: (err) => {
                                    Toast.show({//TODO: No call back error to fix
                                        text1: err.message,
                                        type: 'error',
                                        autoHide: true
                                    });
                                },
                                successCallback: () => {
                                    Toast.show({
                                        text1: "Logged out successfully.",
                                        autoHide: true,
                                        type: "success"
                                    })
                                }
                            }
                        })
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.settingsContainer}>
            <TouchableOpacity
                style={styles.rowStyle}
                onPress={() => navigation.navigate("[SettingStackNavigator] EditProfile")}>
                <Text style={styles.textStyle}> Update Details </Text>
            </TouchableOpacity >
            <View style={styles.line} />
            <TouchableOpacity style={styles.rowStyle} onPress={() => navigation.navigate("[SettingStackNavigator] ChangePassword")}>
                <Text style={styles.textStyle}> Update Password </Text>
            </TouchableOpacity >
            <View style={styles.line} />

            <View style={[styles.sectionSeprator]} />
            <View style={styles.line} />
            <TouchableOpacity style={[styles.rowStyle, { alignItems: 'center' }]} onPress={onSignOut}>
                <Text style={styles.logoutTextStyle}> Log out </Text>
            </TouchableOpacity >
            <View style={styles.line} />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionSeprator: {
        height: 44
    },
    rowStyle: {
        backgroundColor: 'white',
        padding: 10
    },
    textStyle: {
        fontSize: 18,
    },
    logoutTextStyle: {
        fontSize: 18,
        color: 'red'
    },
    line: {
        height: 1,
        backgroundColor: '#e5e5e5',
        width: Dimensions.get('window').width
    },
    settingsContainer: {
        flex: 1,
        paddingTop: 10
    },
    trackButton: {
        backgroundColor: '#e26a00',
        borderRadius: 5,
        color: '#fff',
        fontSize: 20,
        overflow: 'hidden',
        padding: 5,
        width: 150,
        textAlign: 'center',
    },
    opacityStyling: {
        padding: 30,

    }
})

export default SettingScreen;