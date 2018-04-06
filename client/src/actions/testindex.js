//CREATE ALL THESE IN RESPECTIVE FILES
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'; 
export const FETCH_WORD_LISTS_REQUEST = 'REQUEST_WORD_LISTS';
export const FETCH_WORD_LISTS_SUCCESS = 'RECEIVE_WORD_LISTS';
export const FETCH_WORD_LISTS_ERROR = 'ERROR_WORD_LISTS' //something like that
export const SELECT_ACTIVE_WORD_LIST = 'SELECT_ACTIVE_WORD_LIST'; 

//export const ac = (type, payload) => ({ type, payload }); //simple util converting to object with type and payload.

//USER
const requestUser = () => ({
    type: FETCH_USER_REQUEST
});

const receiveUser = user => ({
    type: FETCH_USER_SUCCESS,
    user
});

export function fetchUser() {
    return async dispatch => {
        dispatch(requestUser());
        const response = await fetch('/api/current_user', {credentials: 'include'});
        const json = await response.json();
        console.log(json);
        return dispatch(receiveUser(json));
    }
}

//SELECTED WORDLIST
export const selectActiveWordList = wordList => ({
    type: SELECT_ACTIVE_WORD_LIST,
    wordList
});

//WORDLISTS
//no need to export these. we will use it inside actions to dispatch the type

export function fetchWordLists() {
    return async dispatch => {
        //inform the app that the API call is starting.
        dispatch(requestWordLists());
        const response = await fetch('/api/wordList', { credentials: 'include' });
        const json = response.json();
        console.log(json);
        return dispatch(receiveWordLists(json));
    }
}

const requestWordLists = () => ({ //we will use this to show a spinner from the reducer switch.
    type: FETCH_WORD_LISTS_REQUEST
});

const receiveWordLists = json => ({
    type: FETCH_WORD_LISTS_SUCCESS,
    wordLists: json.data.children.map(child => child.data),
    receivedAt: Date.now() //needd for caching?
});
// const fetchWordLists = 