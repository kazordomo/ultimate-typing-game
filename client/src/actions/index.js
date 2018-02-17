import { FETCH_USER } from './types';

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
        if(response.status === 200) {
            const json = await response.json();
            dispatch({ type: FETCH_USER, payload: json });       
            history.push('/dashboard');
        }
    } catch (err) {
        return;
    }
}