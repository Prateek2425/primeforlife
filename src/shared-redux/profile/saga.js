import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from './slice'
import { API, graphqlOperation, } from 'aws-amplify';
import { getMyProfile } from '../../graphql/queries'
import { updateMyProfile } from '../../graphql/mutations'

export function* getUserProfile(action) {
    yield put(actions.getUserProfileLoading())
    try {
        const response = yield API.graphql(graphqlOperation(getMyProfile));
        const profile = response.data.getMyProfile
        yield put(actions.getUserProfileSuccess(profile))
    } catch (error) {
        yield put(actions.getUserProfileFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* updateUserProfile(action){
    console.log("payload===", action.payload)
    yield put(actions.updateUserProfileLoading())
    try {
       //const response = yield API.graphql(graphqlOperation(updateMyProfile(action.payload.country, action.payload.dob, action.payload.firstName, action.payload.lastName, action.payload.phoneNumber, action.payload.timezone)));
        const response = yield API.graphql({ query: updateMyProfile, variables: {updateMyProfileInput: action.payload.userUpdate}});
        const profile = response.data.updateMyProfile
        yield put(actions.updateUserProfileSuccess(profile))
        action.payload.successCallback(profile)
    } catch (error) {
        yield put(actions.updateUserProfileFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* profileSaga() {
    yield takeLatest(actions.getUserProfile.type, getUserProfile);
    yield takeLatest(actions.updateUserProfile.type, updateUserProfile);
}
