/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { StyleProvider } from '@shoutem/theme'
import { getTheme } from '@shoutem/ui'
import _ from 'lodash'

import Amplify from 'aws-amplify'

import awsmobile from './aws-exports'
Amplify.configure(awsmobile);

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { configureAppStore } from "./src/store/configure-store"
const { store, persistor } = configureAppStore();

import { theme } from './src/styles/themes.styles'
import AppStackNavigator from './src/navigation/navigator'


const myTheme = _.merge(getTheme(), theme)
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <StyleProvider style={myTheme}>
        {/* <PersistGate persistor={persistor}> */}
        <AppStackNavigator />
        {/* </PersistGate> */}
      </StyleProvider>
    </Provider>
  );
};

export default App;
