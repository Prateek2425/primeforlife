/**
 * Combine all reducers in this file and export the combined reducers.
 */

 import { combineReducers } from '@reduxjs/toolkit';
 import { persistReducer } from 'redux-persist';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { loadingReducer } from './../services/loader-service';
 
 /**
  * Merges the main reducer with the router state and dynamically injected reducers
  */
 export function createReducer(injectedReducers = {}) {
   // Initially we don't have any injectedReducers, so returning identity function to avoid the error
   if (Object.keys(injectedReducers).length === 0) {
     return state => state;
   } else {
     const rootReducer = combineReducers({
       ...injectedReducers,
       //loader: loadingReducer,
     });
 
     const persistConfig = {
       key: 'root',
       storage: AsyncStorage,
       debug: true
     };
 
     let persistedRootReducer = persistReducer(persistConfig, rootReducer);
 
     return persistedRootReducer;
   }
 }
 