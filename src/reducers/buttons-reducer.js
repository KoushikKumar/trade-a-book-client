import { SIGN_UP_CLICKED, LOG_IN_CLICKED, UPDATE_PROFILE_CLICKED } from '../actions/types';

export default function(state={ "isSignUpButtonClicked":false, 
                                "isLoginButtonClicked":false,
                                "isUpdateProfileButtonClicked":false }, action) {
    switch(action.type) {
        case SIGN_UP_CLICKED :
            return { ...state, "isSignUpButtonClicked":action.payload }
        case LOG_IN_CLICKED:
            return { ...state, "isLoginButtonClicked":action.payload }
        case UPDATE_PROFILE_CLICKED:
            return { ...state, "isUpdateProfileButtonClicked":action.payload }
    }
    return state;
}