import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { View, Text, Title, Button, Divider } from '@shoutem/ui'
import { KeyboardAvoidContainer } from '../../components/keyboard.avoid.container'
import { appFont, shadow } from '../../styles/themes.styles'
//import {useOnboarding} from 'components/hooks/onboard.hooks'
import { Auth } from 'aws-amplify'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import Logo from '../../components/Logo'
import { SafeAreaView } from 'react-navigation'
import Toast from 'react-native-toast-message';
import { actions, reducer, sliceKey } from '../../shared-redux/auth/slice';
import { authSaga } from '../../shared-redux/auth/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { useDispatch } from 'react-redux'

const ForgotPassword = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authSaga });
  //const onboard = useOnboarding()
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  goBack = () => {
    navigation.goBack()
  }

  onSendCode = () => {
    dispatch({
      type: actions.forgotPassword.type,
      payload: {
        username,
        successCallback: (status) => {
          Toast.show({
            text1: "Code sent on email",
            type: 'success',
            autoHide: true
          })
          navigation.navigate('[AuthNavigator] ResetPassword')
        },
        errorCallback: (err) => {
          Toast.show({
            text1: err.message,
            type: 'error',
            autoHide: true
          })
        }
      }
    })
  }

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidContainer>
        <Divider />
        <Logo styleName="horizontal h-center" />

        <Divider />
        <View styleName="horizontal h-center">
          <Title styleName="bold">Forgot your password?</Title>
        </View>

        <View styleName="md-gutter-vertical lg-gutter-horizontal">
          <Text styleName="h-center">
            Enter your email & we will send you a link to continue
          </Text>
        </View>
        <TextInput
          value={username}
          onChangeText={(val) => setUsername(val)}
          keyboardType="email-address"
          style={styles.number}
          placeholder="username@domain.com"
        //value={(onboard.values.phone_number_formated && onboard.values.phone_number_formated.length>0 ? onboard.values.phone_number_formated : 1)}
        />
        <View styleName="md-gutter">
          <Button onPress={onSendCode} styleName="main">
            <Text styleName="white">Send code</Text>
          </Button>
          <Button styleName="main" onPress={goBack}>
            <Text styleName="white">Back</Text>
          </Button>
        </View>
      </KeyboardAvoidContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: 'white' },
  number: {
    textAlign: 'center',
    width: '100%',
    fontSize: 20,
    color: 'grey',
    marginTop: 10,
    fontFamily: appFont.regular,
    borderRadius: 6,
    backgroundColor: 'white',
    padding: 15,
    ...shadow
  }
})

export default ForgotPassword
