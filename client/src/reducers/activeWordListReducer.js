import { FETCH_ACTIVE_WORD_LIST } from '../actions/types';
import wordList from '../utils/words';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_ACTIVE_WORD_LIST:
            return action.payload || wordList;
        default:
            return state;
    }
}