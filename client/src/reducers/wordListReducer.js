import defaultWordList from '../utils/words';
import { arrayToObj, shuffleWords } from '../utils';
import { 
    SELECT_WORD_LIST,
    FETCH_WORD_LISTS_REQUEST,
    FETCH_WORD_LISTS_SUCCESS,
    FETCH_WORD_LISTS_ERROR,
    FETCH_WORD_LIST_SUCCESS,
    FETCH_GLOBAL_WORD_LISTS_SUCCESS,
    FETCH_GLOBAL_WORD_LIST_SUCCESS,
    POST_WORD_LIST_SUCCESS,
    DELETE_WORD_LIST_SUCCESS,
    UPDATE_WORD_LIST_SUCCESS
} from '../actions/wordListActions';

function addOrUpdateWordList(wordLists, wordList) {
    const userWordLists = wordLists;
    userWordLists[wordList._id] = wordList;
    return userWordLists;
}

function deleteWordList(wordLists, id) {
    const userWordLists = wordLists;
    delete userWordLists[id];
    return userWordLists;
}

export default function(state = {
    isFetched: false,
    userWordLists: {},
    globalWordLists: [],
    preview: {},
    currentWordList: defaultWordList
}, action) {
    switch(action.type) {
        case SELECT_WORD_LIST:
            return {
                ...state,
                isFetched: true,
                currentWordList: state.userWordLists[action.payload] || shuffleWords(defaultWordList)
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
                userWordLists: arrayToObj(action.payload)
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
        case FETCH_GLOBAL_WORD_LISTS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                globalWordLists: action.payload
            }
        case FETCH_GLOBAL_WORD_LIST_SUCCESS:
            return {
            ...state,
            isFetched: true,
            preview: action.payload
        }
        case UPDATE_WORD_LIST_SUCCESS:
            return {
                ...state,
                userWordLists: addOrUpdateWordList(state.userWordLists, action.payload)
            }
        case POST_WORD_LIST_SUCCESS:
            return {
                //need to add to global wordlists if public.
                ...state,
                userWordLists: addOrUpdateWordList(state.userWordLists, action.payload),
                // globalWordLists: action.payload.isPublic ? addOrUpdateWordList(globalWordLists) : globalWordLists //GLOBALWORDLIST NEEDS TO BE AN OBJECT
            }
        case DELETE_WORD_LIST_SUCCESS:
            return {
                ...state,
                userWordLists: deleteWordList(state.userWordLists, action.payload)
            }
        default:
            return state;
    }
}