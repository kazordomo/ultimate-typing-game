import { FETCH_WORDS, POST_WORDS } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case FETCH_WORDS:
        case POST_WORDS:
            return action.payload || false;
        default:
            return state;
    }
}