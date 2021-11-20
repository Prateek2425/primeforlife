import React, {useState} from 'react';
import {View, Input, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Text} from '@shoutem/ui'

const NewSitTestModalScreen = (props) => {

    const sitToStand = {
        title: 'Sit To Stand Test',
        purpose: 'To test your mobility',
        setup: 'Ask a friend or family member to use a stopwatch to time you and (if needed) be there for any balance issues. You can use any walking aids you would normally use. Put a marker or line 3m away from a chair with no obstacles in the way.',
        instructions: ['Sit in chair and wait for friend to start timer and say “Go”',
        'Stand up from the chair and walk at your normal pace towards the marker',
        'When you reach the marker, turn around and walk back to the chair at your normal pace and sit down.',
        'Your friend should stop the timer when you are seated',
        'Record the time (in seconds) for the test.',
        ]
    }

    const navigation = useNavigation();
    const [page, setPage] = useState('start');
    if (page == 'start'){
        return(
            <View style={styles.testModalStyle}>
                <Text style={styles.trackingTitleText}>{sitToStand.title}</Text>
                <Text style={styles.trackingTestLabel}>Purpose:</Text>
                <Text style={styles.trackingParaText}>{sitToStand.purpose}</Text>
                <Text style={styles.trackingTestLabel}>Setup:</Text>
                <Text style={styles.trackingParaText}>{sitToStand.setup}</Text>
                <Text style={styles.trackingTestLabel}>Instructions:</Text>
                {sitToStand.instructions.map((i,index) => {
                    return(
                        <View style={styles.orderedListView} key={index}>
                            <Text >{index + 1}.</Text>
                            <Text style={{flex: 1, paddingLeft: 10}}>{i}</Text>
                        </View>
                    )
                    
                })}
                


                <Button 
                    title="Next"
                    onPress={()=>{
                        setPage('next');
                    }}/>   
                <Button 
                    title="Close"
                    onPress={()=>{
                        navigation.goBack();
                    }}/>        
            </View>
        )
    } else {
        return(
            <View>
                <Text>Hello</Text>
                <Button 
                    title="Back"
                    onPress={()=>{
                        setPage('start');
                    }}/> 
                <Button 
                    title="Close"
                    onPress={()=>{
                        navigation.goBack();
                    }}/>        
            </View>
        )
    }

}

const styles = StyleSheet.create({
    trackingTitleText: {
        paddingTop: 5,
        paddingLeft: 10,
        color: '#1034A6',
        fontSize: 14,
    },
    trackingTestLabel: {
        paddingTop: 5,
        paddingLeft: 10,
        color: '#1034A6',
        fontSize: 12,
    },
    trackingParaText: {
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    testModalStyle: {
        backgroundColor: '#fff',
        flex: 1,
    },
    orderedListView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
        paddingRight: 10,
    }


});

export default NewSitTestModalScreen;