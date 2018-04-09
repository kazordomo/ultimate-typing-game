import { AUTH_ERROR, 
         CLEAR_ERROR, 
         FETCH_WORD_LISTS, 
         FETCH_WORD_LIST, 
         FETCH_USER_TOP_SCORES, 
         FETCH_USER_SUCCESS } from './types';
export * from './userActions';
export * from './leaderboardsActions';
export * from './wordListsActions';

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

export const fetchUserScores = () => async dispatch => {
    try {
        const response = await fetch('/api/scores/user', { credentials: 'include' });
        const json = await response.json();
        dispatch({ type: FETCH_USER_TOP_SCORES, payload: json });
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