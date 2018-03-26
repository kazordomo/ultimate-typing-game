import { FETCH_WORD_LISTS } from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case FETCH_WORD_LISTS:
            return action.payload || false;
        default:
            return state;
    }
}