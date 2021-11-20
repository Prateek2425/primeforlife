import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success : false,
    error : "",
    profile: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers : {
        getUserProfile() { },
        getUserProfileLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        getUserProfileSuccess (state, action) {
            state.loading = false;
            state.error = '';
            state.profile = action.payload;
        },
        getUserProfileFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.profile = null;
        },
        updateUserProfile() { },
        updateUserProfileLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        updateUserProfileSuccess (state, action) {
            state.loading = false;
            state.error = '';
            state.profile = action.payload;
        },
        updateUserProfileFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.profile = null;
        }
    }
})

export const {actions, reducer, name: sliceKey} = profileSlice