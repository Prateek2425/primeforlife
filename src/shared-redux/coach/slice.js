import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success : false,
    error : "",
    user : {}
}

const coachSlice = createSlice({
    name: 'coach',
    initialState,
    reducers : {
        coachUser() { },
        coachLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        coachSuccess (state, action) {
            state.loading = false;
            state.error = '';
            state.user = action.payload;
        },
        coachFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.user = {};
        }
    }
   
})

export const {actions, reducer, name: sliceKey} = coachSlice