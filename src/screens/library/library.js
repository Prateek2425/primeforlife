import React, { useState, useEffect } from 'react'
import { View, Text, Button, Divider } from '@shoutem/ui'
import { FlatList, StyleSheet, Dimensions, Image, SectionList, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { actions, reducer, sliceKey } from '../../shared-redux/library/slice';
import { librarySaga } from '../../shared-redux/library/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useSelector } from 'react-redux'
import { selectLibrary } from '../../shared-redux/library/selectors'
import Toast from 'react-native-toast-message';

const ListItem = ({ item }) => {
    const onPlay = () => {
    }
    return (
        <View style={styles.item}>
            <View style={styles.imageContainer}>
                <Image
                    source={{
                        uri: item.videoContent.thumbnailUrl,
                    }}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                />
                <TouchableOpacity onClick={onPlay} style={{ position: 'absolute' }}>
                    <Image
                        source={require('../../assets/play.png')}
                        style={styles.playButton}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.itemText}>{item.videoContent.title}</Text>
        </View>
    );
};

const Library = (props) => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: librarySaga });

    const dispatch = useDispatch()

    const { libraries } = useSelector(selectLibrary);
    const [refreshing, setRefreshing] = useState(false)
    const [refreshingSection, setRefreshingSection] = useState(false)
    const [listItem, setListItems] = useState([])
    const [pageSection, setpageSection] = useState(1)
    const [page, setpage] = useState(1)

    const renderItem = ({ item }) => {
        <View style={styles.container}>
            <Image style={styles.imageStyle} source={{ uri: item.image }} />
            <Text style={styles.textStyle}>{item.text}</Text>
        </View>

    }

    const getLibraries = () => {
        dispatch({
            type: actions.getLibraries.type,
            payload: {
                pageSection,
                limitSection: 10,
                page: 1,
                limit: 10,
                successCallback: (data) => {
                    console.log("getLibraries success: ", data)
                    setRefreshing(false)
                    setRefreshingSection(false)
                },
                errorCallback: (err) => {
                    setRefreshing(false)
                    setRefreshingSection(false)
                    console.log("getLibraries error: ", err)
                    // Toast.show({//TODO: No call back error to fix
                    //   text1: err.message,
                    //   type: 'error',
                    //   autoHide: true
                    // });
                }
            }
        })
    }


    const getLibrariesByProgram = (programId, pageNum) => {
        dispatch({
            type: actions.getLibrariesByProgram.type,
            payload: {
                pageSection,
                limitSection: 10,
                page: pageNum,
                limit: 10,
                programId,
                successCallback: (data) => {
                    console.log("getLibrariesByProgram success: ", data)
                    setRefreshing(false)
                    setRefreshingSection(false)
                },
                errorCallback: (err) => {
                    setRefreshing(false)
                    setRefreshingSection(false)
                    console.log("getLibrariesByProgram error: ", err)
                    // Toast.show({//TODO: No call back error to fix
                    //   text1: err.message,
                    //   type: 'error',
                    //   autoHide: true
                    // });
                }
            }
        })
    }

    const getLibraryVideoMapByCategory = () => {
        dispatch({
            type: actions.getLibraryVideoMapByCategory.type,
            payload: {
                pageSection,
                limitSection: 10,
                page: 1,
                limit: 10,
                libraryId:10,
                category:"workout",
                successCallback: (data) => {
                    console.log("getLibraryVideoMapByCategory success: ", data)
                    setRefreshing(false)
                    setRefreshingSection(false)
                },
                errorCallback: (err) => {
                    setRefreshing(false)
                    setRefreshingSection(false)
                    console.log("getLibraryVideoMapByCategory error: ", err)
                    // Toast.show({//TODO: No call back error to fix
                    //   text1: err.message,
                    //   type: 'error',
                    //   autoHide: true
                    // });
                }
            }
        })
    }


    useEffect(() => {
        getLibraries()
        getLibraryVideoMapByCategory()
    }, [pageSection])

    const onEndReached = (programId, dataLength) => {
        const currentPage = (dataLength%10 == 0) ? dataLength/10 : Math.floor(dataLength/10) + 1
        getLibrariesByProgram(programId, currentPage + 1)
        //setpage(page + 1)
    }

    const onSectionEndReached = () => {
        setpageSection(pageSection + 1)
    }

    const onSectionRefresh = () => {
        setRefreshingSection(true)
        setpageSection(1)
        setpage(1)
    }

    return (
        <View style={{ flex: 1 }}>
            {
                libraries.length > 0 &&
                <SectionList
                    refreshing={refreshingSection}
                    onRefresh={onSectionRefresh}
                    onEndReached={onSectionEndReached}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    sections={libraries}
                    renderSectionHeader={({ section }) => (
                        <>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <FlatList
                                alwaysBounceHorizontal={false}
                                refreshing={refreshing}
                                onEndReached={() => {onEndReached(section.id, section.data.length)}}
                                horizontal={true}
                                data={section.data}
                                renderItem={({ item }) => <ListItem item={item} />}
                                showsHorizontalScrollIndicator={false}
                            />
                        </>
                    )}
                    renderItem={({ item, section }) => {
                        return null;
                        // return <ListItem item={item} />;
                    }}
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        padding: 5,
        paddingBottom: 100
    },
    playButton: {
        height: 40,
        width: 40
    },
    imageStyle: {
        width: '40%',
        height: '24%',
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    imageContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        padding: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    sectionHeader: {
        fontWeight: '800',
        fontSize: 18,
        // color: '#f4f4f4',
        marginTop: 20,
        marginBottom: 5,
    },
    item: {
        margin: 10,
    },
    itemPhoto: {
        width: Dimensions.get('screen').width / 2 - 30,
        height: Dimensions.get('screen').width / 2 - 30,
        borderRadius: 8
    },
    itemText: {
        // color: 'rgba(255, 255, 255, 0.5)',
        marginTop: 5,
    },
})

export default Library