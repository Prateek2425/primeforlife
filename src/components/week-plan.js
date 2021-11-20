import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';

import { DataStore } from '@aws-amplify/datastore';
import { Engagement } from '../models';
import { Text } from '@shoutem/ui'

import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch, useSelector } from 'react-redux'
import { actions, reducer, sliceKey } from '../shared-redux/schedule/slice';
import { clientScheduleSaga } from '../shared-redux/schedule/saga';
import { selectSchedule } from '../shared-redux/schedule/selectors'

import { selectProfile } from '../shared-redux/profile/selectors'


import Loading from './app.loading';
import { pflCOLORS } from '../styles/themes.styles'
import ScheduleDay from './day.schedule.component'

const WeekPlan = () => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: clientScheduleSaga });

    const dispatch = useDispatch()

    const { profile } = useSelector(selectProfile);
    const { schedule, loading, error } = useSelector(selectSchedule);
    useEffect(() => {
        dispatch({
            type: actions.listMyWeeklySchedule.type,
            payload: {
                successCallback: (data) => {
                },
                errorCallback: (error) => {
                    console.log("schedule load error = ", error)
                    Toast.show({
                        text1: "Couldn't load schedule.",
                        type: 'error',
                        autoHide: true
                    });
                }
            }
        })
    }, [profile]);
    
    const scheduleView = useMemo(() => {
        return (
            [
                <View>
                    <Text style={styles.planLabel}>{(loading) ? "Loading.." : "Plan for this week"}</Text>
                    <View style={styles.planLayout}>
                        {schedule.map((detail, index) => {
                            return (
                                <ScheduleDay
                                    value={detail}
                                />
                            )
                        })}
                    </View>
                </View>
            ]
        )
    }, [schedule])

    return (scheduleView)
}

const styles = StyleSheet.create({
    planContainer: {
        height: 104
    },
    planLabel: {
        padding: 2,
        color: pflCOLORS.black,
        fontSize: 18,
        fontWeight: "700",
        textAlign: 'center'
    },
    planLayout: {
        paddingLeft: 4,
        paddingRight: 4,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default WeekPlan;
