import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    //"credentials include" is needed to get the user out of the passport session. 1h debugging. yay.
    //to prev comment. "fetch won't send or receive any cookies from the server" - the fourteenth row in the docs, srlsy.
    //TODO: use the .catch on fetch instead of try catch.
    try {
        const response = await fetch('/api/current_user', {credentials: 'include'});
        const json = await response.json();
        dispatch({ type: FETCH_USER, payload: json });
    } catch(err) {
        return;
    }
};

export const submitAuthForm = values => async dispatch => {
    try {
        const response = await fetch('/auth/signup', { 
            credentials: 'include',
            method: 'post', 
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        console.log(json)
        dispatch({ type: FETCH_USER, payload: json });        
    } catch (err) {
        return;
    }
}