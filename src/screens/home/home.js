import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {
    StyleSheet,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View } from '@shoutem/ui'
import Toast from 'react-native-toast-message';
// import VideoPlayers from 'react-native-video-players';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { useSelector } from 'react-redux'
import { selectProfile } from '../../shared-redux/profile/selectors'

import WeekPlan from '../../components/week-plan';
import { actions, reducer, sliceKey } from '../../shared-redux/schedule/slice';
import { clientScheduleSaga } from '../../shared-redux/schedule/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch } from 'react-redux'


const HomeScreen = () => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: clientScheduleSaga });
    const { profile } = useSelector(selectProfile);
    let todaysVideoRef = useRef(null)
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [paralexHeight, setParalexHeight] = useState(430)
    const dispatch = useDispatch()
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
        getprogramVideoMap()
    }, [])


    const getprogramVideoMap= () => {
        dispatch({
            type: actions.listprogramVideoMap.type,
            payload: {
                page: 1,
                limit: 10,
                successCallback: (data) => {
                    console.log("listprogramVideoMap success: ", data) 
                },
                errorCallback: (err) => {
                    console.log("listprogramVideoMap error: ", err)
              
                }
            }
        })
    }
    
  


    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <ParallaxScrollView
                stickyHeaderHeight={110}
                backgroundColor="white"
                parallaxHeaderHeight={320}
                renderStickyHeader={() => (<WeekPlan />)}
                onChangeHeaderVisibility={(isVisble) => {
                    (isVisble) ? setParalexHeight(430) : setParalexHeight(210)
                }}
                renderForeground={() => (
                    <View style={{ height: 320, width: Dimensions.get('screen').width }}>
                        {/* <VideoPlayers source={{ uri: "http://d3khwk27axmxnl.cloudfront.net/intro.mp4" }}   // Can be a URL or a local file.
                            ref={(ref) => { todaysVideoRef = ref }}
                            showOnStart={false}
                            tapAnywhereToPause={true}
                            disableFullscreen
                            disableSeekbar
                            disableBack
                            disableTimer
                            paused={true}
                            resizeMode={'cover'}
                            videoStyle={styles.backgroundVideo} /> */}
                        <WeekPlan />
                    </View>
                )}>

                <View style={{ height: Dimensions.get('screen').height - paralexHeight - 70}}>
                    <GiftedChat
                        loadEarlier={true}
                        inverted={false}
                        alignTop={true}

                        bottomOffset={0}
                        messages={messages}
                        onSend={messages => onSend(messages)}
                        user={{
                            _id: 1,
                        }}
                        initialOffsetBottom={false} //needs to be added to MessageContainer.js source code
                        listViewProps={{
                            contentContainerStyle: {
                                flexGrow: 1,
                            }
                        }}
                    />
                </View>
            </ParallaxScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    coachContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    planContainer: {
        paddingTop: 10,
        alignItems: 'center',
        flex: 1,
    },
    videoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: '#ccc',
    },
    videoImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    messageContainer: {
        paddingTop: 10,
        flex: 3,
        backgroundColor: '#fff',
    },
    todaysVideo: {
        padding: 20,
        flex: 1,
        alignItems: 'flex-start',
    },
    todayWorkoutLabel: {
        color: '#000',
        fontSize: 12,
    },
    todayWorkoutTitle: {
        color: '#1034A6',
        fontSize: 16,
    },
    backgroundVideo: {
        resizeMode: 'cover',
    },

});

export default HomeScreen;

