import { arrayToObj } from '../utils';
import { 
    PREVIEW_WORD_LIST,
    FETCH_GLOBAL_WORD_LISTS_REQUEST,
    FETCH_GLOBAL_WORD_LISTS_SUCCESS,
    FETCH_GLOBAL_WORD_LISTS_ERROR,
    FETCH_GLOBAL_WORD_LIST_SUCCESS
} from '../actions/globalWordListActions';
import { 
    POST_WORD_LIST_SUCCESS,
    DELETE_WORD_LIST_SUCCESS,
    UPDATE_WORD_LIST_SUCCESS
} from '../actions/wordListActions';

function addOrUpdateWordList(items, wordList) {
    if(!wordList.isPublic)
        return items

    const wordLists = items;
    wordLists[wordList._id] = wordList;
    return wordLists;
}

function deleteWordList(items, id) {
    if(!items[id])
        return items

    const wordLists = items;
    delete wordLists[id];
    return wordLists;
}

export default function(state = {
    isFetched: false,
    items: {},
    preview: {}
}, action) {
    switch(action.type) {
        case PREVIEW_WORD_LIST:
            return {
                ...state,
                preview: state.items[action.payload]
            }
        case FETCH_GLOBAL_WORD_LISTS_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_GLOBAL_WORD_LISTS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                items: arrayToObj(action.payload)
            }
        case FETCH_GLOBAL_WORD_LISTS_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Error retrieving word lists' }
            }
        case FETCH_GLOBAL_WORD_LIST_SUCCESS:
            return {
                ...state, 
                isFetched: true,
                preview: action.payload 
            };
        case UPDATE_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: addOrUpdateWordList(state.items, action.payload)
            }
        case POST_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: addOrUpdateWordList(state.items, action.payload)
            }
        case DELETE_WORD_LIST_SUCCESS:
            return {
                ...state,
                items: deleteWordList(state.items, action.payload)
            }
        default:
            return state;
    }
}