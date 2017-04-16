import { PREVIOUS_LOCATION_PATH } from '../actions/types';

import { VIEW_ALL } from '../constants/routes-constants';

export default function(state={previousLocationPath:`/${VIEW_ALL}`}, action) {
    switch(action.type) {
        case PREVIOUS_LOCATION_PATH:
            return {...state, previousLocationPath:action.payload}
    }
    return state;
}