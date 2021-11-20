import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Button, Divider } from '@shoutem/ui'
import Logo from '../../components/Logo';
// import Video from 'react-native-video';
import { globalStyles } from '../../styles/themes.styles'
import { SafeAreaView } from 'react-navigation';
import { useIsFocused } from '@react-navigation/native'


const OnboardingVideo = (props) => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex: 1}}>
            <Divider/>
            {/* <Video source={{uri:"http://d3khwk27axmxnl.cloudfront.net/intro.mp4"}}   // Can be a URL or a local file.
                ref={(ref) => {
                    this.player = ref
                }}    
                paused={!useIsFocused()}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                fullscreen = {true}
                resizeMode = "cover"
                repeat = {true}
                style={styles.backgroundVideo} />    */}
            <Logo styleName="horizontal h-center" />
            <View styleName="lg-gutter-vertical md-gutter-horizontal h-center" style={styles.buttonContainer}>
                <Button
                    style={[{ ...globalStyles.button }]}
                    onPress={() => {
                        navigation.navigate("[AuthNavigator] Login")
                        }}>
                    <Text style={styles.buttonTitle}>Login</Text>
                </Button>

                <Button
                    onPress={() => {
                        navigation.navigate("[AuthNavigator] Signup")
                    }}
                    style={[{ ...globalStyles.button }]}>
                    <Text style={styles.buttonTitle}>Signup</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonTitle: {
        fontSize: 20,
        width: 120,
        textAlign: 'center'
    }
});

export default OnboardingVideo;