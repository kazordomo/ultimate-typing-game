import { FETCH_USER, 
         AUTH_ERROR, 
         CLEAR_ERROR, 
         FETCH_WORD_LISTS, 
         FETCH_WORD_LIST, 
         FETCH_ACTIVE_WORD_LIST, 
         FETCH_USER_TOP_SCORES, 
         FETCH_TOP_SCORES,
         FETCH_USER_SUCCESS } from './types';
export * from './userActions';
export * from './leaderboardsActions';

// export const fetchUser = () => async dispatch => {
//     try {
//         const response = await fetch('/api/current_user', {credentials: 'include'});
//         const json = await response.json();
//         dispatch({ type: FETCH_USER, payload: json });
//     } catch(err) {
//         return;
//     }
// };

export const submitAuthForm = (values, authType, history) => async dispatch => {
    try {
        //authtype will either be signup or login. we use the same request for both.
        const response = await fetch(`/auth/${authType}`, { 
            credentials: 'include',
            method: 'post', 
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        if(response.status === 200) {
            dispatch({ type: FETCH_USER_SUCCESS, payload: json });       
            history.push('/dashboard');
        } else {
            dispatch({ type: AUTH_ERROR, payload: json });
            return;
        }
    } catch (err) {
        return;
    }
}

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR, payload: null });
}

export const fetchWordLists = () => async dispatch => {
    try {
        const response = await fetch('/api/wordList', { credentials: 'include' });
        const json = await response.json();
        dispatch({ type: FETCH_WORD_LISTS, payload: json });
    } catch(err) {
        return;
    }
}

export const fetchWordList = id => async dispatch => {
    try {
        const response = await fetch(`/api/wordList/${id}`, { credentials: 'include' });
        const json = await response.json();
        dispatch({ type: FETCH_WORD_LIST, payload: json });
    } catch(err) {
        return;
    }
}

export const fetchActiveWordList = wordList => dispatch => {
    dispatch({ type: FETCH_ACTIVE_WORD_LIST, payload: wordList })
}

export const updateWordList = (wordList, id) => async dispatch => {
    try {
        const response = fetch(`/api/wordList/${id}`, { 
            credentials: 'include',
            method: 'post', 
            body: JSON.stringify(wordList),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        dispatch({ type: FETCH_WORD_LISTS, payload: json });
    } catch(err) {
        return;
    }
}

export const postWordList = (wordList, history) => async dispatch => {
    try {
        const response = fetch('/api/wordList', { 
            credentials: 'include',
            method: 'post', 
            body: JSON.stringify(wordList),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        history.push('/game/practice');
        dispatch({ type: FETCH_WORD_LISTS, payload: json });
    } catch(err) {
        return;
    }
}

export const deleteWordList = (id, history) => async dispatch => {
    try {
        const response = await fetch(`/api/wordList/${id}`, {
            credentials: 'include',
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        history.push('/game/practice');
        dispatch({ type: FETCH_WORD_LISTS, payload: json });
    } catch(err) {
        return;
    }
}

export const fetchUserScores = () => async dispatch => {
    try {
        const response = await fetch('/api/scores/user', { credentials: 'include' });
        const json = await response.json();
        dispatch({ type: FETCH_USER_TOP_SCORES, payload: json });
    } catch(err) {
        return;
    }
}

export const fetchLeaderboardScores = () => async dispatch => {
    try {
        const response = await fetch('/api/scores', { credentials: 'include' });
        const json = await response.json();
        dispatch({ type: FETCH_TOP_SCORES, payload: json });
    } catch(err) {
        return;
    }
}

//TODO: create and fetch the score, not the user.
export const submitScore = (score) => async dispatch => {
    try {
        const response = fetch('/api/scores', { 
            credentials: 'include',
            method: 'post', 
            body: JSON.stringify(score),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        dispatch({ type: FETCH_USER_TOP_SCORES, payload: json }); //?
    } catch(err) {
        return;
    }
}