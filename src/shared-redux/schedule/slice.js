import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success: false,
    error: "",
    schedule: []
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        updateClientScheduleTime() { },
        updateClientScheduleTimeProcessing(state, action) {
            state.loading = true;
            state.error = '';
        },
        updateClientScheduleTimeSuccess(state, action) {
            state.loading = false;
            state.error = '';
        },
        updateClientScheduleTimeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        listMyWeeklySchedule() { },
        listMyWeeklyScheduleLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        listMyWeeklyScheduleSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.schedule = action.payload;
        },
        listMyWeeklyScheduleFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        listprogramVideoMap() { },
        listprogramVideoMapLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        listprogramVideoMapSuccess(state, action) {
            console.log("state",state)
            state.loading = false;
            state.error = '';
            state.schedule = action.payload;
        },
        listprogramVideoMapFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { actions, reducer, name: sliceKey } = scheduleSlice