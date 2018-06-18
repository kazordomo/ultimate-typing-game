import { 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    DELETE_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_ERROR,
} from '../actions/userActions';
import {
    FAVOR_WORD_LIST_SUCCESS,
    DELETE_FAVOR_WORD_LIST_SUCCESS
} from '../actions/wordListActions';

function addFavoredWordList(userData, wordList) {
    const data = userData;
    data.favoredWordLists.push(wordList._id);
    return data;
}

function deleteFavoredWordList(userData, wordList) {
    const data = userData;
    let selectedList = data.favoredWordLists.find(list => list.id === wordList._id);
    data.favoredWordLists.splice(data.favoredWordLists.indexOf(selectedList), 1);
    return data;
}

const initialState = {
    isAuthenticated: false,
    data: {}, 
    error: false,
    isFetching: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                error: false,
                isFetching: true,
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload).length ? true : false,
                data: action.payload,
                error: false,
                isFetching: false,
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case FAVOR_WORD_LIST_SUCCESS:
            return {
                ...state,
                data: addFavoredWordList(state.data, action.payload)
            }
        case DELETE_FAVOR_WORD_LIST_SUCCESS:
            return {
                ...state,
                data: deleteFavoredWordList(state.data, action.payload)
            }
        case DELETE_ACCOUNT_SUCCESS:
            return initialState;
        case DELETE_ACCOUNT_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
};