import { put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice'
import { API, graphqlOperation } from 'aws-amplify';
import { updateClientScheduleTime } from '../../graphql/mutations'
import { listMyWeeklySchedule,listprogramVideoMap } from '../../graphql/queries'

export function* sagaUpdateClientScheduleTime(action) {
    yield put(actions.updateClientScheduleTimeProcessing())
    try {
        const schedule = yield API.graphql(graphqlOperation(updateClientScheduleTime));
        yield put(actions.updateClientScheduleTimeSuccess(schedule))
    } catch (error) {
        yield put(actions.updateClientScheduleTimeFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* sagaListMyWeeklySchedule(action) {
    yield put(actions.listMyWeeklyScheduleLoading())
    try {
        const schedule = yield API.graphql(graphqlOperation(listMyWeeklySchedule));
        const weeklySchedule = schedule.data.listMyWeeklySchedule
        yield put(actions.listMyWeeklyScheduleSuccess(weeklySchedule))
        action.payload.successCallback(schedule)
    } catch (error) {
        yield put(actions.listMyWeeklyScheduleFailure(error))  
        action.payload.errorCallback(error)
    }
}

export function* sagalistprogramVideoMap(action) {
    yield put(actions.listprogramVideoMapLoading())
    try {
        const programVideoMap = yield API.graphql(graphqlOperation(listprogramVideoMap(action.payload.page, action.payload.limit)));
        console.log("programVideoMap",programVideoMap)
        const weeklyprogramVideoMap = programVideoMap.data.listprogramVideoMap
        console.log("weeklySchedule",weeklyprogramVideoMap)
        yield put(actions.listprogramVideoMapSuccess(weeklyprogramVideoMap))
        action.payload.successCallback(programVideoMap)
    } catch (error) {
        yield put(actions.listprogramVideoMapFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* clientScheduleSaga() {
    yield takeLatest(actions.updateClientScheduleTime.type, sagaUpdateClientScheduleTime);
    yield takeLatest(actions.listMyWeeklySchedule.type, sagaListMyWeeklySchedule);
    yield takeLatest(actions.listprogramVideoMap.type, sagalistprogramVideoMap);

}

