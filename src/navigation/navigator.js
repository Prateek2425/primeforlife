import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';

import { useSelector, useDispatch } from "react-redux";
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { selectAuth } from "../shared-redux/auth/selectors";
import { actions, reducer, sliceKey } from '../shared-redux/auth/slice';
import { authSaga } from '../shared-redux/auth/saga';

//Navigators
import AuthStackNavigator from './auth.stack'
import HomeTabNavigator from './home.tab'
import Loading from '../components/app.loading';

function AppStackNavigator() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: authSaga });
  const { authenticated, loading, error, user } = useSelector(selectAuth);
  LogBox.ignoreAllLogs();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: actions.authenticateUser.type,
      payload: {
        errorCallback: (err) => {
          Toast.show({
            text1: err.message,
            type: 'error',
            autoHide: true
          });
        }
      }
    })
  }, []);

  console.log("autenticated = ", authenticated)

  if (loading) {
    return (<>
       <Loading message='Personalizing application for your experience..' />
    
    </>);
  } else {
    return (
      <NavigationContainer>
        {(!authenticated) ? <AuthStackNavigator /> : <HomeTabNavigator />}
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    )
  }
};

export default AppStackNavigator;