import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state.library || initialState;
export const selectLibrary = createSelector(
    [selectDomain],
    selectLibraryState => selectLibraryState
);


