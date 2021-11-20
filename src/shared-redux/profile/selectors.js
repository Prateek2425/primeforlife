import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.profile || initialState;
export const selectProfile = createSelector(
    [selectDomain],
    selectProfileState => selectProfileState
);


