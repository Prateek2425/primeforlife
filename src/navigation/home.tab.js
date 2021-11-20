import React, { useEffect, useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IonIcon from 'react-native-vector-icons/Ionicons'
import {
  View, Image, Text
} from '@shoutem/ui'


//navigators
import CoachStackNavigator from './home.stack';
import LibraryStackNavigator from './library.stack';
import SettingStackNavigator from './setting.stack';
import TrackingStackNavigator from './tracking.stack';

import { useDispatch, useSelector } from 'react-redux'
import { actions, reducer, sliceKey } from '../shared-redux/profile/slice';
import { profileSaga } from '../shared-redux/profile/saga';
import { selectProfile } from '../shared-redux/profile/selectors'
import { useInjectReducer, useInjectSaga } from 'redux-injectors';


//Other
import { pflCOLORS } from '../styles/themes.styles';
import Loading from '../components/app.loading';


const TabStack = createBottomTabNavigator();
const HomeTabNavigator = () => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: profileSaga });
  const dispatch = useDispatch()
  const { profile, loading, error } = useSelector(selectProfile);
  console.log("profile = ", profile)
  useEffect(() => {
    dispatch({
      type: actions.getUserProfile.type,
      payload: {
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
  }, []);

  const name = (p) => {
    if (p != null && p.clientCoachMap) {
      return p.clientCoachMap[0].coach.firstName + " " + p.clientCoachMap[0].coach.lastName
    }
    else {
      return "Coach"
    }
  }

  const profileURL = (p) => {
    if (p != null && p.clientCoachMap) {
      return p.clientCoachMap[0].coach.profileUrl
    }
  }

  const homeTab = useMemo(() => {
    return (
      <TabStack.Screen name="[HomeTabNavigator] CoachStackNavigator" component={CoachStackNavigator}
        options={
          {
            tabBarIcon: () => (
              <View>
                <Image
                  source={{ uri: profileURL() }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    cornerRadius: 15,
                    borderWidth: 0.5,
                    brderColor: pflCOLORS.blue
                  }} />
              </View>
            ),
            title: name(profile)
          }} />
    )
  }, [profile])

  return (
    (loading || profile == null || profile.count == 0) ?<Loading message="Loading profile details.." />:
      <TabStack.Navigator
        screenOptions={
          { headerShown: false }
        }
        tabBarOptions={{
          activeTintColor: pflCOLORS.blue,
          inactiveTintColor: pflCOLORS.textGrey,
          showIcon: true
        }}
      >
        {homeTab}
      <TabStack.Screen
        name="[HomeTabNavigator] LibraryStackNavigator"
        options={
          {
            tabBarIcon: ({ focused, color, size }) => (<IonIcon name={(focused) ? 'library' : 'library-outline'} size={size} color={color} />),
            title: "Library"
          }
        }
        component={LibraryStackNavigator} />
      <TabStack.Screen name="[HomeTabNavigator] TrackingStackNavigator"
        options={
          {
            tabBarIcon: ({ focused, color, size }) => (<IonIcon name={(focused) ? 'analytics' : 'analytics-outline'} size={size} color={color} />),
            title: "Tracking"
          }
        }
        component={TrackingStackNavigator} />
      <TabStack.Screen name="[HomeTabNavigator] SettingStackNavigator"
        options={
          {
            tabBarIcon: ({ focused, color, size }) => (<IonIcon name={(focused) ? 'menu' : 'menu-outline'} size={size} color={color} />),
            title: "Menu"
          }
        }
        component={SettingStackNavigator} />
    </TabStack.Navigator>
  );
}

export default HomeTabNavigator
