import { FETCH_WORD_LIST } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_WORD_LIST:
            return action.payload || false;
        default:
            return state;
    }
}