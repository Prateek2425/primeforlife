import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text } from '@shoutem/ui'
import { pflCOLORS } from '../styles/themes.styles'

const Loading = ({
    imagePath = require('../assets/logo.png'),
    message = ""
}) => {
    return (
        <View styleName="v-center h-center" style={styles.logo}>
            <Image source={imagePath} />
            <Text style={styles.primeTitle}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    primeTitle: {
        fontSize: 26,
        color: pflCOLORS.blue,
        margin: 10,
        textAlign: 'center'
    }
});

export default Loading;