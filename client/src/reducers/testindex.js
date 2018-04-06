import { combineReducers } from "redux";
import wordList from '../utils/words';

//init state to the wordList reducer. could do directly in reducers
// const initialState = {
//     fetching: false,
//     fetched: false,
//     items: [],
//     error: null
// }

import { 
    // FETCH_ACTIVE_WORD_LIST 
    SELECT_ACTIVE_WORD_LIST,
    FETCH_WORD_LISTS_REQUEST,
    FETCH_WORD_LISTS_SUCCESS,
    FETCH_WORD_LISTS_ERROR
} from '../actions/types';

function selectActiveWordList(
    state = {
        isFetching: false,
        wordList
    }, 
    action
) {
    switch(action.type) {
        case SELECT_ACTIVE_WORD_LIST:
            return action.wordList
        default:
            return state;
    }
}

function wordLists(
    state = {
        isFetching: false, //for displaying loading spinner
        items: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_WORD_LISTS:
            return Object.assign({}, state, { //create a copy of the state. the state is immutable.
                isFetching: true //fetching the word lists, show a spinner.
            });
        case RECEIVE_WORD_LISTS:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.wordLists,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

// function topScores(){}

// function topScoreBy