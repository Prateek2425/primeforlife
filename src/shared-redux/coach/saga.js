import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from './slice'
import { API, graphqlOperation, Auth, Hub, DataStore, Predicates, SortDirection } from 'aws-amplify';


export function* registerUser(action) {
    yield put(actions.registerUserLoading())

    //web service call
}

export function* authSaga() {
    yield takeLatest(actions.registerUser.type, registerUser);
}
