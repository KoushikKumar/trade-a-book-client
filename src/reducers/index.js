import { combineReducers } from 'redux';

import buttonsReducer from './buttons-reducer';
import userReducer from './user-reducer';
import booksReducer from './books-reducer';
import pageReducer from './page-reducer';


const rootReducer = combineReducers({
    buttonsClick: buttonsReducer,
    user: userReducer,
    book: booksReducer,
    page:pageReducer
});

export default rootReducer;
