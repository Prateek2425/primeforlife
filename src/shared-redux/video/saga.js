import { put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice'
import { API, graphqlOperation } from 'aws-amplify';
import { listVideoContent, getVideoContent, getMyPreviousWatchVideo } from '../../graphql/queries'

export function* sagaListVideoContent(action) {
    yield put(actions.listVideoContentLoading())
    try {
        const profile = yield API.graphql(graphqlOperation(listVideoContent));
        yield put(actions.listVideoContentSuccess(profile))
    } catch (error) {
        yield put(actions.listVideoContentFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* sagaGetVideoContent(action) {
    yield put(actions.getVideoContentLoading())
    try {
        const profile = yield API.graphql(graphqlOperation(getVideoContent));
        yield put(actions.getVideoContentSuccess(profile))
    } catch (error) {
        yield put(actions.getVideoContentFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* sagaGetMyPreviousWatchVideo(action) {
    yield put(actions.getMyPreviousWatchVideo())
    try {
        const profile = yield API.graphql(graphqlOperation(getMyPreviousWatchVideo));
        yield put(actions.getMyPreviousWatchVideoSuccess(profile))
    } catch (error) {
        yield put(actions.getMyPreviousWatchVideoFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* videoSaga() {
    yield takeLatest(actions.sagaListVideoContent.type, sagaListVideoContent);
    yield takeLatest(actions.sagaGetVideoContent.type, sagaGetVideoContent);
    yield takeLatest(actions.sagaGetMyPreviousWatchVideo.type, sagaGetMyPreviousWatchVideo);
}
