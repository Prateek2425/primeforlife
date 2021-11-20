import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.video || initialState;
export const selectVideo = createSelector(
    [selectDomain],
    selectVideoState => selectVideoState
);


