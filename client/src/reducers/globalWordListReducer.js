import { arrayToObj } from '../utils';
import { 
    PREVIEW_WORD_LIST,
    FETCH_GLOBAL_WORD_LISTS_REQUEST,
    FETCH_GLOBAL_WORD_LISTS_SUCCESS,
    FETCH_GLOBAL_WORD_LISTS_ERROR,
    FETCH_GLOBAL_WORD_LIST_SUCCESS,
    SORT_GLOBAL_WORD_LISTS,
    FILTER_GLOBAL_WORD_LISTS
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

function sortWordLists(items, field) {
    //if object - convert to array to make the sort
    const array = (typeof items === 'object') ? Object.keys(items).map(i => items[i]) : items;

    if(field === 'createdDate') {
        return arrayToObj(array.sort((a, b) => new Date(b['createdDate']) - new Date(a['createdDate'])));
    } else {
        return arrayToObj(array.sort((a, b) => b[field] - a[field]));
    }
}

function filterWordLists(items, filter) {
    const array = (typeof items === 'object') ? Object.keys(items).map(i => items[i]) : items;

    return arrayToObj(array.filter(wordList => {
        return wordList.name === filter;
    }));
}

export default function(state = {
    isFetched: false,
    items: {},
    preview: {},
    sort: 'createdDate',
    filter: ''
}, action) {
    switch(action.type) {
        case PREVIEW_WORD_LIST:
            return {
                ...state,
                preview: state.items[action.payload]
            }
        case SORT_GLOBAL_WORD_LISTS:
            return {
                ...state,
                sort: action.payload,
                items: sortWordLists(state.items, action.payload)
            }
        case FILTER_GLOBAL_WORD_LISTS:
            //we will not use items: filterFunc here, becuase the items will never reset.
            return {
                ...state,
                filter: action.payload
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
                items: sortWordLists(action.payload, 'createdDate')
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
