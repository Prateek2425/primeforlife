import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@shoutem/ui'
import { pflCOLORS } from '../styles/themes.styles'

const Logo = () => {
    return (
        <View style={styles.logo}>
            <Image source={require('../assets/logo.png')} style={styles.headerImage} />
            <Text style={styles.primeTitle}>Prime For Life</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerImage: {
        width: 28,
        height: 28,
    },
    logo: {
        alignItems: 'center',
        flex: 1,
    },
    primeTitle: {
        fontSize: 10,
        color: pflCOLORS.blue,
        margin: 2
    }
});


export default Logo;