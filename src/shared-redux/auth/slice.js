import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success: false,
    error: "",
    user: {},
    authenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser() { },
        registerUserLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        registerUserSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
        },
        registerUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        },

        confirmSignUp() {},
        confirmSignUpLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        confirmSignUpSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
        },
        confirmSignUpFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        },

        signInUser() { },
        signInUserLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        signInUserSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
            state.authenticated = true
        },
        signInUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        },

        authenticateUser() { },
        authenticateUserLoading(state, action) {
            state.loading = true;
            state.error = '';
            state.authenticated = false
        },
        authenticateUserSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
            state.authenticated = true
        },
        authenticateUserFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
            state.authenticated = false
        },

        forgotPassword() {},
        resetPassword() { },
        changePassword() { },

        logout() { },
        logoutLoading(state, action) {
            state.loading = true;
            state.error = '';
        },
        logoutSuccess(state, action) {
            state.loading = false;
            state.error = '';
            state.authenticated = false
        },
        logoutFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { actions, reducer, name: sliceKey } = authSlice