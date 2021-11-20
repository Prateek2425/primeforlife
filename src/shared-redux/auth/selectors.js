import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

const selectDomain = (state) => state.auth || initialState;

export const selectAuth = createSelector(
  [selectDomain],
  selectAuthState => selectAuthState,
);

  