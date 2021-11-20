import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

const selectDomain = (state) => state.coach || initialState;

export const selectCoach = createSelector(
  [selectDomain],
  selectCoachState => selectCoachState,
);