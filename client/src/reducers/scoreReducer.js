import { FETCH_SCORE } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_SCORE:
            return action.payload || false;
        default:
            return state;
    }
}