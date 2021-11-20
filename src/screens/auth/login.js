import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView
} from 'react-native'
import { View, Text, Button, Divider } from '@shoutem/ui'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'

import { useDispatch } from 'react-redux'
import { actions, reducer, sliceKey } from '../../shared-redux/auth/slice';
import { authSaga } from '../../shared-redux/auth/saga';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import Logo from '../../components/Logo'
import { KeyboardAvoidContainer } from '../../components/keyboard.avoid.container'
import { pflCOLORS, globalStyles } from '../../styles/themes.styles'

const Signin = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authSaga });
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const toggleShow = () => {
    setShow(!show)
  }

  const [email, setEmail] = useState('awasthi.arp@gmail.com')
  const [password, setPassword] = useState('helloworld')

  const onSignIn = () => {
    dispatch({
      type: actions.signInUser.type,
      payload: {
        email,
        password,
        successCallback: (data) => {
          console.log("Login User: ", data) 
        },
        errorCallback: (err) => {
          console.log("Login User: ", err)
          Toast.show({//TODO: No call back error to fix
            text1: err.message,
            type: 'error',
            autoHide: true
          });
        }
      }
    })
  }

  const toSignup = () => {
    navigation.navigate('[AuthNavigator] Signup')
  }

  const toForgotPassword = () => {
    navigation.navigate('[AuthNavigator] ForgotPassword')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <KeyboardAvoidContainer>
          <Divider />
          <Logo styleName="horizontal h-center" />

          <View styleName="md-gutter-vertical lg-gutter-horizontal">
            <Text styleName="h-center" />
          </View>
          <TextInput
            value={email}
            keyboardType="email-address"
            style={[styles.input, styles.topInput]}
            onChangeText={(val) => setEmail(val)}
            placeholder="Email"
            maxLength={100}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <View>
            <TextInput
              value={password}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={!show}
              style={[styles.input, styles.bottomInput]}
              placeholder="Password"
            />
            <View style={globalStyles.button}>
              <TouchableOpacity onPress={toggleShow}>
                {!show ? (
                  <Text>show</Text>
                ) : (
                  <Text>hide</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View styleName="md-gutter h-center">
            <Button onPress={onSignIn} styles={[{ ...globalStyles.button }, { backgroundColor: 'red' }]} >
              <Text styleName="white button-text">Sign In</Text>
            </Button>
          </View>
          <Divider />
          <TouchableOpacity onPress={toForgotPassword}>
            <Text styleName="text-center">Forgot password?</Text>
          </TouchableOpacity>
        </KeyboardAvoidContainer>
        <View styleName="md-gutter h-center" style={styles.button}>
          <View styleName="h-center v-center horizontal lg-gutter">
            <View style={styles.line} />
            <Text styleName="text-center">OR</Text>
            <View style={styles.line} />
          </View>
          <Divider />
          <Button
            styleName="main"
            style={[styles.innerbutton, { ...styles.button }]}
            onPress={toSignup}>
            <Text style={{ color: pflCOLORS.white }}>Create New Account</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width
  },
  innerbutton: {
    backgroundColor: pflCOLORS.blue
  },
  topInput: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5
  },
  bottomInput: {
    borderWidth: 0.5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  input: {
    width: '100%',
    fontSize: 15,
    color: 'darkgrey',
    fontFamily: 'Helvetica Neue',
    backgroundColor: 'white',
    padding: 15
  },
  image: { resizeMode: 'contain', height: 60, width: 60 },
  line: {
    width: 80,
    margin: 10,
    height: 1,
    backgroundColor: '#00000070'
  }
})

export default Signin