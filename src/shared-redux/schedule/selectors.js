import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.schedule || initialState;
export const selectSchedule = createSelector(
    [selectDomain],
    selectScheduleState => selectScheduleState,
);