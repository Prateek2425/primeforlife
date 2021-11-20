import React, { useMemo } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet } from 'react-native';
import { Text } from '@shoutem/ui'
import dayjs from 'dayjs'
import { pflCOLORS } from '../styles/themes.styles';

const scheduleState = {
    past: 'past',
    today: 'today',
    future: 'future'
}

const ScheduleDay = (
    {
        value = {},
        exercising = true,
        exercised = false
    }
) => {
    const timeState = useMemo(() => {
        let currentDay = dayjs().format('ddd').toUpperCase()
        var daysSequence = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        let scheduleDayIndex = daysSequence.indexOf(value.scheduleDay)
        let currentDayIndex = daysSequence.indexOf(currentDay)

        var state = scheduleState.today
        if (scheduleDayIndex < currentDayIndex) {
            state = scheduleState.past
        } else if (scheduleDayIndex > currentDayIndex) {
            state = scheduleState.future
        }
        return state
    })

    return (
        <View style={[styles.dayBox, stateStyle(timeState)]}>
            <Text style={styles.dayLabel}>{value.scheduleDay}</Text>
            {exercising && <Text style={styles.timeLabel}>{value.startTime}</Text>}
            {!exercising && <Text style={styles.timeLabel}>Rest</Text>}
            { exercising &&
                <View style={[styles.iconSection]}>
                    <IonIcon name="ios-barbell-sharp" size={16} color="black" style={[styles.icon]} />
                    {exercised && <IonIcon name="checkmark-circle" size={16} color="green" style={[styles.icon]} />}
                    {timeState == 'past' && !exercised && <IonIcon name="close-circle-outline" size={16} color="orange" style={[styles.icon]} />}
                </View>
            }
            {!exercising && <Ionicons name="md-walk" size={16} color="black" />}
        </View>
    )
}

const stateStyle = (currentState) => {
    switch (currentState) {
        case scheduleState.past: return ({
            borderColor: pflCOLORS.blue,
            borderWidth: 1,
        })
        case scheduleState.today: return ({
            borderColor: pflCOLORS.blue,
            borderWidth: 3
        })
        case scheduleState.future: return ({
            borderColor: pflCOLORS.textGrey,
            borderWidth: 1
        })
    }
}

const styles = StyleSheet.create({
    dayBox: {
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginRight: 2,
    },
    dayLabel: {
        padding: 1,
        color: pflCOLORS.blue,
        fontSize: 13,
    },
    timeLabel: {
        color: pflCOLORS.blue,
        fontSize: 12,
        paddingBottom: 2,
    },
    iconSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        flex: 1,
        paddingLeft: 4,
    }
});

export default ScheduleDay