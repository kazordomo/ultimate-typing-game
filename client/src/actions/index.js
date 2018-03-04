import { FETCH_USER, AUTH_ERROR, CLEAR_ERROR, FETCH_WORDS } from './types';

export const fetchUser = () => async dispatch => {
    try {
        const response = await fetch('/api/current_user', {credentials: 'include'});
        const json = await response.json();
        dispatch({ type: FETCH_USER, payload: json });
    } catch(err) {
        return;
    }
};

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
            dispatch({ type: FETCH_USER, payload: json });       
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

export const fetchWords = () => async dispatch => {
    try {
        const response = await fetch('/api/wordList');
        const json = await response.json();
        dispatch({ type: FETCH_WORDS, payload: json });
    } catch(err) {
        return;
    }
}