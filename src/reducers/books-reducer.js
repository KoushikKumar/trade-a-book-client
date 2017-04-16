import { ALL_BOOK_DATA, BOOK_DETAILS_BY_ID, UPDATE_REQUEST_DETAILS } from '../actions/types';
import { REQUEST_PENDING } from '../constants/content-constants';

export default function(state={bookData:[], bookdetailsById:{}}, action) {
    switch(action.type) {
        case ALL_BOOK_DATA :
            return {...state, bookData:action.payload, bookdetailsById:{}}
        case BOOK_DETAILS_BY_ID:
            return {...state, bookdetailsById:action.payload, bookData:[]}
        case UPDATE_REQUEST_DETAILS:
            const { userName, address } = action.payload;
            let bookdetailsById =  JSON.parse(JSON.stringify(state.bookdetailsById));
            
            bookdetailsById["buyersInfo"][userName] = {
                "address":address,
                "status":REQUEST_PENDING
            };
            return {...state, bookdetailsById:bookdetailsById}
    }
    return state;
}