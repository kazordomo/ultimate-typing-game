export const SELECT_WORD_LIST = 'SELECT_WORD_LIST';
export const FETCH_WORD_LISTS_REQUEST = 'FETCH_WORD_LISTS_REQUEST';
export const FETCH_WORD_LISTS_SUCCESS = 'FETCH_WORD_LISTS_SUCCESS';
export const FETCH_WORD_LISTS_ERROR = 'FETCH_WORD_LISTS_ERROR';
export const FETCH_WORD_LIST_SUCCESS = 'FETCH_WORD_LIST_SUCCESS';
export const POST_WORD_LIST_SUCCESS = 'POST_WORD_LIST_SUCCESS';
export const UPDATE_WORD_LIST_SUCCESS = 'UPDATE_WORD_LIST_SUCCESS';
export const DELETE_WORD_LIST_SUCCESS = 'DELETE_WORD_LIST_SUCCESS';
export const FAVOR_WORD_LIST_SUCCESS = 'FAVOR_WORD_LUST_SUCCESS';
export const DELETE_FAVOR_WORD_LIST_SUCCESS = 'DELETE_FAVOR_WORD_LIST_SUCCESS';

const requestWordLists = () => ({
    type: FETCH_WORD_LISTS_REQUEST
});

const receiveWordLists = wordLists => ({
    type: FETCH_WORD_LISTS_SUCCESS,
    payload: wordLists
});

export const selectWordList = id => dispatch => {
    dispatch({ type: SELECT_WORD_LIST, payload: id });
}

const shouldFetchWordList = state => {
    const wordLists = state.wordLists;

    if(wordLists.isFetched)
        return false;
    return true;
}

const fetchWordLists = () => async dispatch => {
    dispatch(requestWordLists());
    const response = await fetch('/api/wordLists/user', { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveWordLists(json));
}

export const fetchWordListsIfNeeded = () => (dispatch, getState) => {
    if(shouldFetchWordList(getState())) {
        return dispatch(fetchWordLists());
    }
}

const fetchWordList = id => async dispatch => {
    const response = await fetch(`/api/wordList/${id}`, { credentials: 'include' });
    const json = await response.json();
    dispatch({ type: FETCH_WORD_LIST_SUCCESS, payload: json });
}

export const fetchWordListIfNeeded = id => (dispatch, getState) => {
    if(shouldFetchWordList(getState())) {
        return dispatch(fetchWordList(id));
    } else {
        return dispatch(selectWordList(id));
    }
}

export const addWordList = (wordList) => async dispatch => {
    const response = await fetch('/api/wordList', { 
        credentials: 'include',
        method: 'post', 
        body: JSON.stringify(wordList),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
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
    history && history.push('/game/practice');
    dispatch({ type: UPDATE_WORD_LIST_SUCCESS, payload: json });
}

export const deleteWordList = (id, history) => async dispatch => {
    await fetch(`/api/wordList/${id}`, {
        credentials: 'include',
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });
    history.push('/game/practice');
    dispatch({ type: DELETE_WORD_LIST_SUCCESS, payload: id });
}

export const favorWordList = wordList => dispatch => {
    try {
        fetch('/api/wordList/user/favor', { 
            credentials: 'include',
            method: 'post',
            body: JSON.stringify({ wordListId: wordList._id }),
            headers: { 'Content-Type': 'application/json' }
        });
        dispatch({ type: FAVOR_WORD_LIST_SUCCESS, payload: wordList });
    } catch(err) {
        //dispatch error
        console.log(err);
    }
}

export const deleteFavoredWordList = wordList => dispatch => {
    try {
        fetch('/api/wordList/user/favor', { 
            credentials: 'include',
            method: 'delete',
            body: JSON.stringify({ wordListId: wordList._id }),
            headers: { 'Content-Type': 'application/json' }
        });
        dispatch({ type: DELETE_FAVOR_WORD_LIST_SUCCESS, payload: wordList._id });
    } catch(err) {
        //dispatch error
        console.log(err);
    }
}
