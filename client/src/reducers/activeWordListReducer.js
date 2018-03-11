import { FETCH_ACTIVE_WORD_LIST } from '../actions/types';
import wordList from '../utils/words';

function shuffleWords(arr) {
    console.log(arr);
    return arr
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1])
};

export default function(state = null, action) {
    // if(action.payload) {
    //     action.payload = shuffleWords(action.payload);
    // }
    switch(action.type) {
        case FETCH_ACTIVE_WORD_LIST:
            return action.payload || wordList;
        default:
            return state;
    }
}