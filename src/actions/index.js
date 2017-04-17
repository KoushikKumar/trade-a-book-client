import { SIGN_UP_CLICKED, 
         IS_USER_AUTHENTICATED, 
         SIGN_UP_ERROR,
         LOG_IN_CLICKED,
         LOG_IN_ERROR,
         USER_DATA,
         UPDATE_PROFILE_CLICKED,
         ALL_BOOK_DATA,
         LEFT_AND_RIGHT_PAGE_NUMBER,
         BOOK_DETAILS_BY_ID,
         PREVIOUS_LOCATION_PATH,
         UPDATE_REQUEST_DETAILS,
         MY_BOOK_DETAILS,
         MY_BOOKS_PAGE_NUMBER,
         ACTIVE_MY_BOOK_DETAILS,
         UPDATE_REQUESTED_STATUS,
         ADD_BOOK } from './types';

import axios from 'axios';
import { browserHistory } from 'react-router';

import { SIGN_UP_URI, 
         LOG_IN_URI, 
         UPDATE_PROFILE_URI, 
         FETCH_ALL_BOOK_DATA, 
         FETCH_BOOK_DETAILS_BY_ID,
         REQUEST_BOOK_URI,
         GET_MY_BOOK_DETAILS_URI,
         UPDATE_REQUESTED_STATUS_URI,
         ADD_BOOK_URI } from './uris';
import { TOKEN_KEY, UNAUTHORIZED, AUTHORIZATION, TOKEN } from '../constants/content-constants';
import { MY_BOOKS } from '../constants/routes-constants';

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

export function submitSignupData(userName, password, address, previousLocationPath) {
    const user = {userName, password, address};
    return function(dispatch) {
        axios.post(SIGN_UP_URI, user)
            .then(response => {
                localStorage.setItem(TOKEN_KEY,JSON.stringify(response.data));
                browserHistory.push(previousLocationPath);
                dispatch ({ type:IS_USER_AUTHENTICATED, payload:true });
            })
            .catch((e) => {
                dispatch({ type:SIGN_UP_ERROR, payload:e.response.data.error })
            });
    }
}

export function submitLoginData(userName, password, previousLocationPath) {
    const user = {userName, password};
    return function(dispatch) {
        axios.post(LOG_IN_URI, user)
            .then(response => {
                localStorage.setItem(TOKEN_KEY,JSON.stringify(response.data));
                browserHistory.push(previousLocationPath);
                dispatch ({ type:IS_USER_AUTHENTICATED, payload:true });
                
            })
            .catch((e) => {
                if(e.response.data === UNAUTHORIZED) {
                    dispatch({ type:LOG_IN_ERROR, payload:"Invalid username or password" })
                }
            });
    }
}

export function updateProfile(userName, address, previousLocationPath) {
    const user = {userName, address};
    const tokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return function(dispatch) { 
        axios.post(`${UPDATE_PROFILE_URI}?${AUTHORIZATION}=${tokenData[TOKEN]}`, { data: user})
            .then(response => {
                tokenData.address = address;
                localStorage.setItem(TOKEN_KEY,JSON.stringify(tokenData));
                browserHistory.push(previousLocationPath);
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

export function fetchAllBooks() {
    return function(dispatch) {
        axios.get(FETCH_ALL_BOOK_DATA)
            .then(response => {
                dispatch({
                    type: ALL_BOOK_DATA,
                    payload: response.data
                });
            })
    }
}

export function setPageNumbers(leftPage, rightPage) {
    return { type:LEFT_AND_RIGHT_PAGE_NUMBER, payload:{left:leftPage, right:rightPage} }
}

export function setSinglePageFooterPageNumber(payload) {
    return { type:MY_BOOKS_PAGE_NUMBER, payload }
}

export function fetchBookDetails(bookId) {
    return function(dispatch) {
        axios.get(`${FETCH_BOOK_DETAILS_BY_ID}/${bookId}`)
            .then(response => {
                dispatch({
                    "type":BOOK_DETAILS_BY_ID,
                    "payload":response.data
                });
            })
    }
}

export function setPreviousLocationPath(path) {
    return {
        type: PREVIOUS_LOCATION_PATH,
        payload: path
    }
}

export function requestBook(userName, address, bookId) {
    const userData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return function(dispatch) {
        axios.post(`${REQUEST_BOOK_URI}?${AUTHORIZATION}=${userData[TOKEN]}`, {userName, address, bookId})
            .then(response => {
                dispatch(
                    {
                        type: UPDATE_REQUEST_DETAILS,
                        payload: {userName, address}
                    }
                )
            })
    }
}

export function fetchMyBookDetails() {
    const userData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    const userName = userData.userName.toLowerCase();
    return function(dispatch) {
        axios.get(`${GET_MY_BOOK_DETAILS_URI}/${userName}?${AUTHORIZATION}=${userData[TOKEN]}`) 
            .then(response => {
                dispatch(
                    {
                        type: MY_BOOK_DETAILS,
                        payload: response.data
                    }
                )
            })
    }
}

export function updateActiveMyBookDetails(payload) {
    return {
        type: ACTIVE_MY_BOOK_DETAILS,
        payload
    }
}

export function updateRequestedStatus(status, bookId, buyerName, whichBook) {
    const userData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return function(dispatch) {
        axios.post(`${UPDATE_REQUESTED_STATUS_URI}?${AUTHORIZATION}=${userData[TOKEN]}`, {status, bookId, buyerName})
            .then(response => {
                dispatch(
                    {
                        type: UPDATE_REQUESTED_STATUS,
                        payload: {
                            whichBook,
                            status,
                            bookId,
                            buyerName
                        }
                    }
                )
            }
        )
    }
} 

export function addBook(book) {
    const userData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    const userName = userData.userName.toLowerCase();
    const { address } = userData;
    book.sellerInfo["name"] = userName;
    book.sellerInfo["address"] = address;

    return function(dispatch) {
        axios.post(`${ADD_BOOK_URI}?${AUTHORIZATION}=${userData[TOKEN]}`, book)
            .then(response => {
                browserHistory.push(`/${MY_BOOKS}`);
                   dispatch(
                       {
                           type:ADD_BOOK
                       }
                   )  
            })
    }
} 