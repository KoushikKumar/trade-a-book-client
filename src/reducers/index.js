import { combineReducers } from 'redux';

import buttonsReducer from './buttons-reducer';
import userReducer from './user-reducer';
import booksReducer from './books-reducer';
import pageReducer from './page-reducer';
import locationReducer from './location-reducer';


const rootReducer = combineReducers({
    buttonsClick: buttonsReducer,
    user: userReducer,
    book: booksReducer,
    page:pageReducer,
    routeLocation: locationReducer
});

export default rootReducer;
