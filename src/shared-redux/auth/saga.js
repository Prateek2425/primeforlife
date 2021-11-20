import { call, put, takeLatest } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';
import { actions } from './slice'

export function* registerUser(action) {
    console.log("in registerUser ==")
    yield put(actions.registerUserLoading())
    try {
        const { user } = yield Auth.signUp({
            username: action.payload.user.email,
            password: action.payload.user.password,
            attributes: {
                name: action.payload.user.name
            }
        })
        console.log("user registerUser ==", user)
        yield put(actions.registerUserSuccess(user))
        action.payload.successCallback({ username, password })
    } catch (error) {
        console.log("error registerUser ==", error)
        yield put(actions.registerUserFailure(error))
        action.payload.errorCallback(error)
        // action.payload.successCallback(error)
    }
}

export function* confirmSignUp(action) {
    yield put(actions.confirmSignUpLoading())
    try {
        const status = yield Auth.confirmSignUp(action.payload.email, action.payload.code)
        console.log("user confirmSignUp==", status)
        // yield put(actions.confirmSignUpSuccess(user))
        action.payload.successCallback(status)
    } catch (error) {
        console.log("error confirmSignUp==", error)
        yield put(actions.confirmSignUpFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* signInUser(action) {
    console.log('signInUser:', action);
    yield put(actions.signInUserLoading())
    try {
        const user = yield Auth.signIn({ username: action.payload.email, password: action.payload.password })
        console.log("user ==", user)
        yield put(actions.signInUserSuccess(user))
    } catch (error) {
        yield put(actions.signInUserFailure(error))
    }
}

export function* forgotPassword(action) {
    try {
        const status = yield Auth.forgotPassword(action.payload.username)
        action.payload.successCallback()
    } catch (error) {
        action.payload.errorCallback(error)
    }
}

export function* resetPassword(action) {
    try {
        const status = yield Auth.forgotPasswordSubmit(action.payload.user.email, action.payload.user.otp, action.payload.user.password)
        action.payload.successCallback()
    } catch (error) {
        action.payload.errorCallback(error)
    }
}

export function* changePassword(action) {
    try{
        console.log("action payload ===", action.payload)
        const user = yield Auth.currentAuthenticatedUser()
        const data = Auth.changePassword(user, action.payload.user.oldPassword, action.payload.user.newPassword);
        action.payload.successCallback()
    }catch (error) {
        action.payload.errorCallback(error)
    }
}

export function* authenticateUser(action) {
    yield put(actions.authenticateUserLoading())

    //web service call
    try {
        const user = yield Auth.currentUserInfo()
        if (user) {
            yield put(actions.authenticateUserSuccess(user))
        } else {
            yield put(actions.authenticateUserFailure({}))
        }
    } catch {
        yield put(actions.authenticateUserFailure(error))
    }
}

export function* logout(action) {
    try {
        yield Auth.signOut();
        yield put(actions.logoutSuccess())
        action.payload.successCallback()
    } catch (error) {
        yield put(actions.logoutFailure(error))
        action.payload.errorCallback(error)
    }
}

export function* authSaga() {
    yield takeLatest(actions.registerUser.type, registerUser);
    yield takeLatest(actions.signInUser.type, signInUser);
    yield takeLatest(actions.authenticateUser.type, authenticateUser);
    yield takeLatest(actions.confirmSignUp.type, confirmSignUp)
    yield takeLatest(actions.forgotPassword.type, forgotPassword)
    yield takeLatest(actions.resetPassword.type, resetPassword)
    yield takeLatest(actions.logout.type, logout)
    yield takeLatest(actions.changePassword.type, changePassword)
}
