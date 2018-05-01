export const PREVIEW_WORD_LIST = 'PREVIEW_WORD_LIST';
export const FETCH_GLOBAL_WORD_LISTS_REQUEST = 'FETCH_GLOBAL_WORD_LISTS_REQUEST';
export const FETCH_GLOBAL_WORD_LISTS_SUCCESS = 'FETCH_GLOBAL_WORD_LISTS_SUCCESS';
export const FETCH_GLOBAL_WORD_LISTS_ERROR = 'FETCH_GLOBAL_WORD_LISTS_ERROR';
export const FETCH_GLOBAL_WORD_LIST_SUCCESS = 'FETCH_GLOBAL_WORD_LIST_SUCCESS';
export const SORT_GLOBAL_WORD_LISTS = 'SORT_GLOBAL_WORD_LISTS';
export const FILTER_GLOBAL_WORD_LISTS = 'FILTER_GLOBAL_WORD_LISTS';

const requestGlobalWordLists = () => ({
    type: FETCH_GLOBAL_WORD_LISTS_REQUEST
});

const receiveGlobalWordLists = wordLists => ({
    type: FETCH_GLOBAL_WORD_LISTS_SUCCESS,
    payload: wordLists
});

export const selectPreview = id => dispatch => {
    dispatch({ type: PREVIEW_WORD_LIST, payload: id });
}

const shouldFetchGlobalWordList = state => {
    const globalWordLists = state.globalWordLists;
    if(globalWordLists.isFetched)
        return false;
    return true;
}

const fetchGlobalWordLists = () => async dispatch => {
    dispatch(requestGlobalWordLists());
    const response = await fetch('/api/wordLists/all', { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveGlobalWordLists(json));
}

export const fetchGlobalWordListsIfNeeded = () => (dispatch, getState) => {
    if(shouldFetchGlobalWordList(getState())) {
        return dispatch(fetchGlobalWordLists());
    }
}

const fetchGlobalWordList = id => async dispatch => {
    const response = await fetch(`/api/wordList/${id}`, { credentials: 'include' });
    const json = await response.json();
    dispatch({ type: FETCH_GLOBAL_WORD_LIST_SUCCESS, payload: json });
}

export const fetchGlobalWordListIfNeeded = id => (dispatch, getState) => {
    if(shouldFetchGlobalWordList(getState())) {
        return dispatch(fetchGlobalWordList(id));
    } else {
        return dispatch(selectPreview(id));
    }
}

export const sortGlobalWordLists = field => dispatch => {
    dispatch({ type: SORT_GLOBAL_WORD_LISTS, payload: field });
}

export const filterGlobalWordLists = searchQuery => dispatch => {
    dispatch({ type: FILTER_GLOBAL_WORD_LISTS, payload: searchQuery });
}
