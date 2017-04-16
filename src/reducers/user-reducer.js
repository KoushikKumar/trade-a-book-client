import { IS_USER_AUTHENTICATED, SIGN_UP_ERROR, LOG_IN_ERROR, USER_DATA } from '../actions/types';

export default function(state={ isUserAuthenticated:false, 
                                signupErrorMessage:"",
                                loginErrorMessage:"",
                                userData:{} }, action) {
    switch(action.type) {
        case IS_USER_AUTHENTICATED :
            if(action.payload) {
                return {...state, isUserAuthenticated:action.payload};
            } 
            return {...state, isUserAuthenticated:action.payload, userData:{}};
        case SIGN_UP_ERROR :
            return {...state, signupErrorMessage:action.payload};
        case LOG_IN_ERROR :
            return {...state, loginErrorMessage:action.payload};
        case USER_DATA : 
            const userData = {};
            userData["userName"] = action.payload.userName;
            userData["address"] = action.payload.address;
            return {...state, userData:userData};
    }
    return state;
}