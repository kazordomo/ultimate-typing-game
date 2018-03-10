import { FETCH_WORD_LISTS, FETCH_WORD_LIST, POST_WORDS } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_WORD_LISTS:
        case FETCH_WORD_LIST:
        case POST_WORDS:
            return action.payload || false;
        default:
            return state;
    }
}