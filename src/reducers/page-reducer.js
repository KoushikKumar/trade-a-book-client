import { LEFT_AND_RIGHT_PAGE_NUMBER } from '../actions/types';

export default function(state={leftPageNumber:0, rightPageNumber:0 }, action) {
    switch(action.type) {
        case LEFT_AND_RIGHT_PAGE_NUMBER:
            return { ...state, leftPageNumber:action.payload.left, rightPageNumber:action.payload.right }
    } 
    return state;
}