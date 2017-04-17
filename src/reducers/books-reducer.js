import { ALL_BOOK_DATA, 
         BOOK_DETAILS_BY_ID, 
         UPDATE_REQUEST_DETAILS, 
         MY_BOOK_DETAILS, 
         ACTIVE_MY_BOOK_DETAILS,
         UPDATE_REQUESTED_STATUS,
         ADD_BOOK } from '../actions/types';
import { REQUEST_PENDING, ACTIVE_MY_BOOK_DETAILS_CONSTANT, BOOK_DETAILS_BY_ID_CONSTANT } from '../constants/content-constants';

export default function(state={bookData:[], bookdetailsById:{}, myBookDetails:[], activeMyBookDetails:{}}, action) {
    switch(action.type) {
        case ALL_BOOK_DATA :
            return {...state, bookData:action.payload, bookdetailsById:{}, myBookDetails:[], activeMyBookDetails:{}}
        case BOOK_DETAILS_BY_ID:
            return {...state, bookdetailsById:action.payload, bookData:[], myBookDetails:[], activeMyBookDetails:{}}
        case UPDATE_REQUEST_DETAILS:
            const { userName, address } = action.payload;
            let bookdetailsById =  JSON.parse(JSON.stringify(state.bookdetailsById));
            
            bookdetailsById["buyersInfo"][userName] = {
                "address":address,
                "status":REQUEST_PENDING
            };
            return {...state, bookdetailsById:bookdetailsById, bookData:[], myBookDetails:[], activeMyBookDetails:{}}
        case MY_BOOK_DETAILS:
            return {...state, myBookDetails:action.payload, bookData:[], bookdetailsById:{}, activeMyBookDetails:action.payload[0]}
        case ACTIVE_MY_BOOK_DETAILS:
            return {...state, activeMyBookDetails: action.payload, bookData:[], bookdetailsById:{}}
        case UPDATE_REQUESTED_STATUS:
            const {whichBook, status, bookId, buyerName} = action.payload;
            if(whichBook === ACTIVE_MY_BOOK_DETAILS_CONSTANT) {
                let activeMyBookDetails = JSON.parse(JSON.stringify(state.activeMyBookDetails));
                activeMyBookDetails["buyersInfo"][buyerName]["status"] = status; 

                let myBookDetails = state.myBookDetails.map((book) => {
                    if(book._id === bookId) {
                        book["buyersInfo"][buyerName]["status"] = status; 
                    }
                    return book;
                })
                return {...state, activeMyBookDetails, myBookDetails, bookData:[], bookdetailsById:{}}
            }
            if(whichBook === BOOK_DETAILS_BY_ID_CONSTANT) {
                let bookdetailsById = JSON.parse(JSON.stringify(state.bookdetailsById));
                bookdetailsById["buyersInfo"][buyerName]["status"] = status;
                return {...state, bookdetailsById, bookData:[], myBookDetails:[], activeMyBookDetails:{}}
            }
            
        case ADD_BOOK:
            return state;
    }
    return state;
}