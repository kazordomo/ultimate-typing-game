export const SELECT_WORD_LIST = 'SELECT_WORD_LIST';
export const FETCH_WORD_LISTS_REQUEST = 'FETCH_WORD_LISTS_REQUEST';
export const FETCH_WORD_LISTS_SUCCESS = 'FETCH_WORD_LISTS_SUCCESS';
export const FETCH_WORD_LISTS_ERROR = 'FETCH_WORD_LISTS_ERROR';
export const FETCH_WORD_LIST_SUCCESS = 'FETCH_WORD_LIST_SUCCESS';
export const POST_WORD_LIST_SUCCESS = 'POST_WORD_LIST_SUCCESS';
export const UPDATE_WORD_LIST_SUCCESS = 'UPDATE_WORD_LIST_SUCCESS';
export const DELETE_WORD_LIST_SUCCESS = 'DELETE_WORD_LIST_SUCCESS';

const requestWordLists = () => ({
    type: FETCH_WORD_LISTS_REQUEST
});

const receiveWordLists = wordLists => ({
    type: FETCH_WORD_LISTS_SUCCESS,
    payload: wordLists
});


export const fetchWordLists = () => async dispatch => {
    dispatch(requestWordLists());
    const response = await fetch('/api/wordLists', { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveWordLists(json));
}

export const selectWordList = id => dispatch => {
    dispatch({ type: SELECT_WORD_LIST, payload: id });
}

const fetchWordList = id => async dispatch => {
    const response = await fetch(`/api/wordList/${id}`, { credentials: 'include' });
    const json = await response.json();
    dispatch({ type: FETCH_WORD_LIST_SUCCESS, payload: json });
}

const shouldFetchWordList = state => {
    const wordLists = state.wordLists;

    if(wordLists.isFetched)
        return false;
    return true;
}

export const fetchWordListIfNeeded = id => (dispatch, getState) => {
    if(shouldFetchWordList(getState())) {
        return dispatch(fetchWordList(id));
    } else {
        return dispatch(selectWordList(id));
    }
}

export const addWordList = (wordList, history) => async dispatch => {
    console.log(wordList);
    const response = await fetch('/api/wordList', { 
        credentials: 'include',
        method: 'post', 
        body: JSON.stringify(wordList),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    history.push('/game/practice');
    dispatch({ type: POST_WORD_LIST_SUCCESS, payload: json });
}

export const updateWordList = (wordList, id, history) => async dispatch => {
    //TODO: dev - proxy request econnreset
    const response = await fetch(`/api/wordList/${id}`, { 
        credentials: 'include',
        method: 'put', 
        body: JSON.stringify(wordList),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    history.push('/game/practice');
    dispatch({ type: UPDATE_WORD_LIST_SUCCESS, payload: json });
}

export const deleteWordList = (id, history) => async dispatch => {
    await fetch(`/api/wordList/${id}`, {
        credentials: 'include',
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });
    history.push('/game/practice');
    //TODO: when we delete the wordList, we should set the default list and update
    //the wordlists.
    dispatch({ type: DELETE_WORD_LIST_SUCCESS });
}
