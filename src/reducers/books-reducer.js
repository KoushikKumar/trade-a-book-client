import { ALL_BOOK_DATA, BOOK_DETAILS_BY_ID } from '../actions/types';

export default function(state={bookData:[], bookdetailsById:{}}, action) {
    switch(action.type) {
        case ALL_BOOK_DATA :
            return {...state, bookData:action.payload}
        case BOOK_DETAILS_BY_ID:
            return {...state, bookdetailsById:action.payload}
    }
    return state;
}