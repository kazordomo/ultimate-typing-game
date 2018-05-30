import defaultWordList from '../utils/words';
import { arrayToObj, shuffleWords } from '../utils';
import { 
    SELECT_WORD_LIST,
    FETCH_WORD_LISTS_REQUEST,
    FETCH_WORD_LISTS_SUCCESS,
    FETCH_WORD_LISTS_ERROR,
    FETCH_WORD_LIST_SUCCESS,
    POST_WORD_LIST_SUCCESS,
    POST_WORD_LIST_ERROR,
    DELETE_WORD_LIST_SUCCESS,
    UPDATE_WORD_LIST_SUCCESS,
    UPDATE_WORD_LIST_ERROR,
    FAVOR_WORD_LIST_SUCCESS,
    DELETE_FAVOR_WORD_LIST_SUCCESS
} from '../actions/wordListActions';
import { CLEAN_ERROR } from '../actions/errorActions';

function addOrUpdateWordList(items, wordList) {
    const wordLists = items;
    wordLists[wordList._id] = wordList;
    return wordLists;
}

function deleteWordList(items, id) {
    const wordLists = items;
    delete wordLists[id];
    return wordLists;
}

export default function(state = {
    isFetched: false,
    items: {},
    currentWordList: defaultWordList,
    error: false,
}, action) {
    switch(action.type) {
        case SELECT_WORD_LIST:
            return {
                ...state,
                currentWordList: state.items[action.payload] || shuffleWords(defaultWordList)
            }
        case FETCH_WORD_LISTS_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_WORD_LISTS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                items: arrayToObj(action.payload)
            }
        case FETCH_WORD_LISTS_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Error retrieving word lists' }
            }
        case FETCH_WORD_LIST_SUCCESS:
            return {
                ...state, 
                isFetched: true,
                currentWordList: action.payload 
            };
        case UPDATE_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: addOrUpdateWordList(state.items, action.payload)
            }
        case UPDATE_WORD_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case POST_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: addOrUpdateWordList(state.items, action.payload)
            }
        case POST_WORD_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case DELETE_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: deleteWordList(state.items, action.payload)
            }
        case FAVOR_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: addOrUpdateWordList(state.items, action.payload)
            }
        case DELETE_FAVOR_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: deleteWordList(state.items, action.payload)
            }
        case CLEAN_ERROR:
            return {
                ...state,
                error: false
            }
        default:
            return state;
    }
}