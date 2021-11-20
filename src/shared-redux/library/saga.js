import {call, put, takeLatest} from 'redux-saga/effects';
import {actions} from './slice'
import { API, graphqlOperation } from 'aws-amplify';
import { listLibraries, listLibrariesByProgram,listLibraryVideoMapByCategory } from '../../graphql/queries'

export function* getLibraries(action) {


    yield put(actions.getLibrariesLoading())
    try {
        const response = yield API.graphql(graphqlOperation(listLibraries(action.payload.pageSection,action.payload.limitSection, action.payload.page, action.payload.limit)));
        const libraries = response.data.listLibraries
        let newArr = []
        for(let i=0;i<libraries.length;i++){
            let obj = {}
            obj["data"] = libraries[i].libraryVideoMap
            obj["description"] = libraries[i].description
            obj["id"] = libraries[i].id
            obj["title"] = libraries[i].title
            newArr.push(obj)
        }
        const fulldata = {
            sectiondata : newArr,
            page : action.payload.pageSection
        }
        yield put(actions.getLibrariesSuccess(fulldata))
        action.payload.successCallback(response)
    } catch (error) {
        yield put(actions.getLibrariesFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* getLibrariesByProgram(action) {
  
    yield put(actions.getLibrariesByProgramLoading())
    try{
        const response = yield API.graphql(graphqlOperation(listLibrariesByProgram(action.payload.pageSection,action.payload.limitSection, action.payload.page, action.payload.limit, action.payload.programId)));
        const libraries = response.data.listLibraryMapByProgram
        let newArr = []
        for(let i=0;i<libraries.length;i++){
            let obj = {}
            obj["data"] = libraries[i].library.libraryVideoMap
            obj["description"] = libraries[i].library.description
            obj["id"] = libraries[i].library.id
            obj["title"] = libraries[i].library.title
            newArr.push(obj)
        }
        const fulldata = {
            sectiondata : newArr,
            programId : action.payload.programId,
            page : action.payload.page
        }
        yield put(actions.getLibrariesSuccess(fulldata))
        action.payload.successCallback(response)

    } catch(error){
        yield put(actions.getLibrariesByProgramFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* getLibraryVideoMapByCategory(action) {
     console.log("action",action.payload.category)

    yield put(actions.getLibraryVideoMapByCategoryLoading())
    try {
        const response = yield API.graphql(graphqlOperation(listLibraryVideoMapByCategory(action.payload.pageSection,action.payload.limitSection, action.payload.page, action.payload.limit,action.payload.libraryId,action.payload.category)));
        const libraries = response.data.listLibraryVideoMapByCategory
        let newArr = []
        for(let i=0;i<libraries.length;i++){
            let obj = {}
            obj["data"] = libraries[i].libraryVideoMap
            obj["description"] = libraries[i].description
            obj["id"] = libraries[i].id
            obj["title"] = libraries[i].title
            newArr.push(obj)
        }
        const fulldata = {
            sectiondata : newArr,
            page : action.payload.pageSection
        }
        yield put(actions.getLibraryVideoMapByCategorySuccess(fulldata))
        action.payload.successCallback(response)
    } catch (error) {
        yield put(actions.getLibraryVideoMapByCategoryFailure(error))
        action.payload.errorCallback(error)
    }
}




export function* librarySaga() {
    yield takeLatest(actions.getLibraries.type, getLibraries);
    yield takeLatest(actions.getLibrariesByProgram.type, getLibrariesByProgram)
    yield takeLatest(actions.getLibraryVideoMapByCategory.type, getLibraryVideoMapByCategory)

}

