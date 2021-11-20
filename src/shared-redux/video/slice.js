import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success: false,
    error: "",
    videos: [],
    video: {}
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        getVideoContent() { },
        getVideoContentLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        getVideoContentSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.video = action.payload;
        },
        getVideoContentFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.video = {};
        },

        listVideoContent() { },
        listVideoContentLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        listVideoContentSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.videos = action.payload;
        },
        listVideoContentFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.videos = [];
        },

        getMyPreviousWatchVideo() { },
        getMyPreviousWatchVideoLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        getMyPreviousWatchVideoSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.video = action.payload;
        },
        getMyPreviousWatchVideoFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.video = {};
        }
    }
})

export const { actions, reducer, name: sliceKey } = videoSlice