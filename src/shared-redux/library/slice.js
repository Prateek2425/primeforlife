import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    loading: false,
    success : false,
    error : "",
    libraries: []
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers : {
        getLibraries() { },
        getLibrariesLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        getLibrariesSuccess (state, action) {
            state.loading = false;
            state.error = '';
            if(action.payload.sectiondata.length > 0){
                state.libraries = (action.payload.page > 1) ? [...state.libraries, ...action.payload.sectiondata] : action.payload.sectiondata
            }
        },
        getLibrariesFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.libraries = state.libraries;
        },
        getLibrariesByProgram() { },
        getLibrariesByProgramLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        getLibrariesByProgramSuccess (state, action) {
            state.loading = false;
            state.error = '';
            if(action.payload.sectiondata.length > 0 && action.payload.sectiondata[0].data.length > 0){
                let index = state.libraries.indexOf(x => x.id === action.payload.programId)
                const section = state.libraries[index]
                let videosMap = (action.payload.page > 1) ? [...section.data, ...action.payload.sectiondata[0].data] : action.payload.sectiondata[0].data
                section.data = videosMap;
                state.libraries[index] = section
            }
        },
        getLibrariesByProgramFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.libraries = state.libraries;
        },

        
        getLibraryVideoMapByCategory() { },
        getLibraryVideoMapByCategoryLoading (state, action) {
            state.loading = true;
            state.error = '';
        },
        getLibraryVideoMapByCategorySuccess (state, action) {
            state.loading = false;
            state.error = '';
            if(action.payload.sectiondata.length > 0){
                state.libraries = (action.payload.page > 1) ? [...state.libraries, ...action.payload.sectiondata] : action.payload.sectiondata
            }
        },
        getLibraryVideoMapByCategoryFailure (state, action) {
            state.loading = false;
            state.error = action.payload;
            state.libraries = state.libraries;
        },
    }
})

export const {actions, reducer, name: sliceKey} = librarySlice