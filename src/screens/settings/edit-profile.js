import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Button, Divider, Title } from '@shoutem/ui'
import { ScrollView, TouchableOpacity, StyleSheet, Alert, Dimensions, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidContainer } from '../../components/keyboard.avoid.container'
import DatePicker from '../../components/datePicker'
import { globalStyles } from '../../styles/themes.styles'
import { selectProfile } from '../../shared-redux/profile/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { actions, reducer, sliceKey } from '../../shared-redux/profile/slice';
import { profileSaga } from '../../shared-redux/profile/saga';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import CountryCodes from '../../data/countrycodes.json';

const EditProfile = (props) => {
    useInjectReducer({ key: sliceKey, reducer: reducer });
    useInjectSaga({ key: sliceKey, saga: profileSaga });
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const { profile } = useSelector(selectProfile);
    const [user, setUser] = useState(profile)
    const [date, setDate] = useState(new Date(profile.dob))

    const handleFirstNameChange = (text) => {
        setUser({
            ...user,
            'firstName': text
        })
    }

    const handleFamilyNameChange = (text) => {
        setUser({
            ...user,
            'lastName': text
        })
    }

    const handlePhoneChange = (text) => {
        setUser({
            ...user,
            'phoneNumber': text
        })
    }

    const handleEmailChange = (text) => {
        setUser({
            ...user,
            'email': text
        })
    }

    const timeZoneChange = (text) => {
        setUser({
            ...user,
            'email': text
        })
    }


    const onDateChange = (_, selectedDate) => {
        const currentDate = selectedDate || user.dob
        setDate(currentDate)
        setUser({
            ...user,
            'dob': moment(currentDate).format('YYYY-MM-DD')
        })
    }

    const handleCountryChange = (text) => {
        setUser({
            ...user,
            'country': text
        })
    }

    const onSave = () => {
        dispatch({
            type: actions.updateUserProfile.type,
            payload: {
                userUpdate: {
                    country: user.country,
                    dob: user.dob,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    timezone: user.timezone,
                },
                successCallback: (data) => {
                    navigation.goBack()
                    Toast.show({
                        text1: "Profile updated successfully",
                        type: 'success',
                        autoHide: true
                    });
                },
                errorCallback: (error) => {
                    console.log("profile load error = ", error)
                    Toast.show({
                        text1: "Couldn't load profile.",
                        type: 'error',
                        autoHide: true
                    });
                }
            }
        })
    }

    const footerView = useMemo(() => {
        return (
            <View style={styles.buttonContainer} >
                <Button
                    style={[{ width: `40%` }, { ...globalStyles.button }]}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonTitle}>Cancel</Text>
                </Button >
                <Button
                    style={[{ width: `40%` }, { ...globalStyles.button }]}
                    onPress={onSave}>
                    <Text style={styles.buttonTitle}>Save</Text>
                </Button >
            </View >
        )
    })


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidContainer
                style={styles.container}
                touchToDismiss={false}
                footer={footerView}>
                <View style={styles.container}>
                    <Title style={styles.title}>Update Details</Title>
                    <Text style={styles.fieldName}>First Name</Text>
                    <TextInput
                        value={user.firstName}
                        style={styles.input}
                        placeholder={user.firstName}
                        name="firstName"
                        keyboardType='name-phone-pad'
                        onChangeText={handleFirstNameChange}
                    />
                    <Text style={styles.fieldName}>Family Name</Text>
                    <TextInput
                        value={user.lastName}
                        style={styles.input}
                        placeholder={user.lastName}
                        name="lastName"
                        keyboardType='name-phone-pad'
                        onChangeText={handleFamilyNameChange}
                    />
                    <Text style={styles.fieldName}>Country</Text>
                    <TextInput
                        value={user.country}
                        style={styles.input}
                        placeholder={user.country}
                        name="country"
                        keyboardType='name-phone-pad'
                        onChangeText={handleCountryChange}
                    />
                    <Text style={styles.fieldName}>Phone</Text>
                    <TextInput
                        value={user.phoneNumber}
                        style={styles.input}
                        placeholder={user.phoneNumber}
                        name="phone"
                        keyboardType='phone-pad'
                        onChangeText={handlePhoneChange}
                    />
                    <Text style={styles.fieldName}>E-mail</Text>
                    <TextInput
                        value={user.email}
                        style={styles.input}
                        placeholder={user.email}
                        name="email"
                        keyboardType='email-address'
                        onChangeText={handleEmailChange}
                    />
                    <Text style={styles.fieldName}>Time Zone</Text>
                    <TextInput
                        value={user.email}
                        style={styles.input}
                        placeholder={user.email}
                        name="email"
                        keyboardType='email-address'
                        onChangeText={handleEmailChange}
                    />
                    <Text style={styles.fieldName}>Date of Birth</Text>
                    <DatePicker
                        mode={'date'}
                        style={styles.dateOfBirth}
                        onChange={onDateChange}
                        title={moment(user.dob, 'YYYY-MM-DD').format('MM/DD/YYYY')}
                        value={date}
                    />
                </View>
                {footerView}
            </KeyboardAvoidContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.95
    },
    title: {
        alignSelf: 'flex-start'
    },
    fieldName: {
        marginLeft: 10
    },
    scroll: {
        width: `100%`
    },
    buttonTitle: {
        fontSize: 20,
        width: 120,
        textAlign: 'center'
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 8,
        width: `100%`
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10
    },
    dateOfBirth: {
        padding: 16,
        textAlign: 'left'
    }
});


export default EditProfile;