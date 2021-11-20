import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Button, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'
import { DataStore, Predicates, SortDirection } from 'aws-amplify';
import { Test, TestScore } from '../models';
import LineChartComponent from '../components/LineChartComponent';
import { useNavigation } from '@react-navigation/native';
import {Text} from '@shoutem/ui'



//TODO Get Authenticated User
const clientID = '737aac9a-c83b-435d-90a2-06afb6bb305a'; // TODO - needs to wired up to Authenticated User

//TODO: Re-write to pull tests from DB
//TODO: Fix higherIsStronger in UI
const testDBtoRefactor = [{
    name: "Sit to Stand",
    id: '5e742a7d-ff81-4866-aeca-ba768de95ac0',
    higherIsStronger: true,
    label: "Sit to Stand Test",
},
{
    name: "Timed Up and Go",
    id: '5406e365-db06-4e9d-a856-1ddb85f05e88',
    higherIsStronger: false,
    label: "Timed Up and Go Test",
},
];


const Tracking = () => {

    const navigation = useNavigation();
    const [tests, setTests] = useState({ data: [], loading: true });
    // const [labels, setLabels] = useState(['a','b','c']);
    // const [scores, setScores] = useState([1,2,3]);

    useEffect(() => {
        fetchTestScores();
        const subscription = DataStore.observe(TestScore, Predicates.ALL, {
            sort: s => s.date(SortDirection.ASCENDING)

        }).filter(c => c.Client.id === clientID).subscribe(() => fetchTestScores());

        return () => subscription.unsubscribe();
    }, [])

    async function fetchTestScores() {
        const testScores = (await DataStore.query(TestScore, Predicates.ALL,
            {
                sort: s => s.date(SortDirection.ASCENDING)
            }
        )).filter(c => c.Client.id === clientID);

        setTests({ data: testScores, loading: false });

    };

    async function writeScore() {
        const scoreData = {
            ClientID: 'f332220c-cf66-43cd-b1e9-c92278fd5c6a',
            TestID: "9d55c391-e07e-44c4-b3cb-be3cb8e0f5ab",
            Score: 17,
            Date: new Date().toISOString()
        }
        await DataStore.save(
            new TestScores(scoreData)
        );
    }

    return (
        <SafeAreaView style={[styles.trackingScreenContainer]}>
            <ScrollView>
                {!tests.loading && testDBtoRefactor.map((i, index) => {
                    let testSubset = tests.data.filter(testScore => testScore.Test.id == i.id)
                    return (
                        <View key={index}>
                            <Text style={styles.trackingTitleText}>{i.label}</Text>
                            <LineChartComponent
                                data={testSubset}
                                width={Dimensions.get("window").width}
                            />
                        </View>

                    )
                })}

            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("[TestNavigator]")}>
                    <Text style={styles.trackButton}
                        onPress={() => navigation.navigate("[TestNavigator]")}>
                        + Check Your Strength
                    </Text>
                </TouchableOpacity >
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    trackingScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        padding: 5,
        backgroundColor: '#fff'
    },
    trackButton: {
        backgroundColor: '#e26a00',
        borderRadius: 5,
        color: '#fff',
        fontSize: 20,
        overflow: 'hidden',
        padding: 5,
        alignSelf : 'center'
    },
    trackingTitleText: {
        paddingTop: 5,
        paddingLeft: 10,
        color: '#1034A6',
        fontSize: 12,
    }
});

export default Tracking;