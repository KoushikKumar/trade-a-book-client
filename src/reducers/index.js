import { combineReducers } from 'redux';

import ButtonsReducer from './buttons-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({
    buttonsClick: ButtonsReducer,
    user: userReducer
});

export default rootReducer;
