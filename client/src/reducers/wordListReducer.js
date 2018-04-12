import defaultWordList from '../utils/words';
import { 
    SELECT_WORD_LIST,
    FETCH_WORD_LISTS_REQUEST,
    FETCH_WORD_LISTS_SUCCESS,
    FETCH_WORD_LISTS_ERROR,
    FETCH_WORD_LIST_SUCCESS,
    POST_WORD_LIST_SUCCESS,
    DELETE_WORD_LIST_SUCCESS,
    UPDATE_WORD_LIST_SUCCESS
} from '../actions/wordListActions';

//export from util folder
function arrayToObj(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
    }, {});
}

export default function(state = {
    isFetched: false,
    items: {},
    currentWordList: defaultWordList
}, action) {
    switch(action.type) {
        case SELECT_WORD_LIST:
            return {
                ...state,
                isFetched: true,
                currentWordList: state.items[action.payload] || defaultWordList
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
        //because we are fetching lists every time we mount practice-comp this is fine for now.
        case UPDATE_WORD_LIST_SUCCESS:
        case POST_WORD_LIST_SUCCESS:
        case DELETE_WORD_LIST_SUCCESS:
            return state;
            // return Object.assign({}, state, {
            //     ...state,
            //     isFetched: true,
            //     items: [...state.items, ...action.payload]
            // });
        default:
            return state;
    }
}