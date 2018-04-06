import { FETCH_WORD_LIST } from '../actions/types';

//TODO: THIS CAN BE A SYNC CALL. WE CAN GET THE LIST FROM WORDLISTS.
export default function(state = null, action) {
    switch(action.type) {
        case FETCH_WORD_LIST:
            return action.payload || false;
        default:
            return state;
    }
}