import React from 'react';
import {View, Alert, Button, SafeAreaView, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import {Text} from '@shoutem/ui'
// import {Video, AVPlaybackStatus} from 'expo-av';
// import {useNavigation} from '@react-navigation/native';
// import {format} from 'date-fns';
// import { DataStore } from '@aws-amplify/datastore';
// import { VideoPlay, Engagement } from '../../src/models';

const PlayVideoModal = (props) => {

    // const videoItem = props.video;
    // const userID = props.user;
    // const workout = props.workout;
    // let newPlay = {videocontentID: videoItem.id, clientID: userID,};
    // const video = React.useRef(null);
    // const[status, setStatus] = React.useState({});
    // const navigation = useNavigation();

    // let starttime = new Date();

    // function videoLoaded(){
    //     starttime = new Date();
    //     newPlay.start = starttime.toISOString();
    // }

    // async function videoFinished(){
    //     let endtime = new Date();
    //     newPlay.end = endtime.toISOString();
    //     let playtime = (endtime - starttime) / 1000;
        
    //     //If playtime is more than a specified % of a video, add engagement to database
    //     //TODO: Move 0.25 to an environment setting
    //     if (workout && playtime / videoItem.seconds > 0.25){
    //         await DataStore.save(
    //             new Engagement({
    //                 "date": new Date().toISOString(),
    //                 "clientID": userID
    //             })
    //         );
    //     }
        
    //     await DataStore.save(
    //         new VideoPlay(newPlay)
    //     );
    // }
    

    // return (   
    //     <SafeAreaView style={{ flex: 1}}>
    //             <View style={styles.loadedView}>
    //                 <View style={styles.descriptionContainer}>
    //                     <Text style={styles.title}>{videoItem.title}</Text>
    //                 </View>
                    
                
    //                 <Video
    //                         ref={video}
    //                         style = {{height: 300, width: 300}}
    //                         source = {{uri: videoItem.videoURI}}
    //                         useNativeControls
    //                         resizeMode = "contain"
    //                         isLooping = 'false'
    //                         isMuted = 'false'
    //                         onLoad = {() => videoLoaded()}
    //                     //onPlaybackStatusUpdate={status => setStatus(() => status)} // This was causing a loop of the code before the return
    //                     />
    //                 <View style={styles.descriptionContainer}>
    //                     <Text style={styles.descriptionText}>{videoItem.description}</Text>
    //                 </View>
    //             </View>
    //         <Button 
    //         title="Close"
    //         style={styles.button}
    //         onPress={()=>{
    //             videoFinished().then(res => {navigation.goBack()});
    //         }}/>            
    //     </SafeAreaView>
    // );
    return (<View/>)
}

const styles = StyleSheet.create({
    loadedView: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
        
    },
    title: {
        fontSize: 20,
        color: '#000',
    },
    descriptionText: {
        paddingTop: 10
    },
    descriptionContainer: {
        width: 300
    },
    button: {
        backgroundColor: '#fff'
    }
    
});

export default PlayVideoModal;