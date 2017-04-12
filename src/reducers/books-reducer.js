import { ALL_BOOK_DATA } from '../actions/types';

export default function(state={bookData:[]}, action) {
    switch(action.type) {
        case ALL_BOOK_DATA :
            return {...state, bookData:action.payload}
    }
    return state;
}