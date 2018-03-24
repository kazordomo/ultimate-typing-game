import { FETCH_USER_TOP_SCORES, FETCH_TOP_SCORES } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_TOP_SCORES:
        case FETCH_USER_TOP_SCORES:
            return action.payload || false;
        default:
            return state;
    }
}