import { SIGN_UP_CLICKED, 
         IS_USER_AUTHENTICATED, 
         SIGN_UP_ERROR,
         LOG_IN_CLICKED,
         LOG_IN_ERROR,
         USER_DATA,
         UPDATE_PROFILE_CLICKED } from './types';

import axios from 'axios';
import { browserHistory } from 'react-router';

import { SIGN_UP_URI, LOG_IN_URI, UPDATE_PROFILE_URI } from './uris';
import { TOKEN_KEY, UNAUTHORIZED, AUTHORIZATION, TOKEN } from '../constants/content-constants';

export function signUpClicked(payload) {
    return {
        type: SIGN_UP_CLICKED,
        payload
    }
}

export function logInClicked(payload) {
    return {
        type: LOG_IN_CLICKED,
        payload
    }
}

export function updateProfileClicked(payload) {
    return {
        type: UPDATE_PROFILE_CLICKED,
        payload
    }
}

export function submitSignupData(userName, password, address) {
    const user = {userName, password, address};
    return function(dispatch) {
        axios.post(SIGN_UP_URI, user)
            .then(response => {
                localStorage.setItem(TOKEN_KEY,JSON.stringify(response.data));
                dispatch ({ type:IS_USER_AUTHENTICATED, payload:true });
                browserHistory.push('/');
            })
            .catch((e) => {
                dispatch({ type:SIGN_UP_ERROR, payload:e.response.data.error })
            });
    }
}

export function submitLoginData(userName, password) {
    const user = {userName, password};
    return function(dispatch) {
        axios.post(LOG_IN_URI, user)
            .then(response => {
                localStorage.setItem(TOKEN_KEY,JSON.stringify(response.data));
                dispatch ({ type:IS_USER_AUTHENTICATED, payload:true });
                browserHistory.push('/');
            })
            .catch((e) => {
                if(e.response.data === UNAUTHORIZED) {
                    dispatch({ type:LOG_IN_ERROR, payload:"Invalid username or password" })
                }
            });
    }
}

export function updateProfile(userName, address) {
    const user = {userName, address};
    const tokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return function(dispatch) { 
        axios.post(`${UPDATE_PROFILE_URI}?${AUTHORIZATION}=${tokenData[TOKEN]}`, { data: user})
            .then(response => {
                tokenData.address = address;
                localStorage.setItem(TOKEN_KEY,JSON.stringify(tokenData));
                browserHistory.push('/');
            })
            .catch(() => {

            });
    }
}

export function setSignupErrorMessage(payload) {
    return { type:SIGN_UP_ERROR, payload }
}

export function setLoginErrorMessage(payload) {
    return { type:LOG_IN_ERROR, payload }
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    return { type:IS_USER_AUTHENTICATED, payload:false }
}

export function setUserAuthentication(payload) {
    return { type:IS_USER_AUTHENTICATED, payload }
}

export function fetchUserData() {
    const userData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    if(userData) {
        return {
            type: USER_DATA,
            payload: userData
        }
    }
}