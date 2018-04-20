import { FETCH_USER_SUCCESS, FETCH_USER_ERROR } from './userActions';

export const submitAuthForm = (values, authType, history) => async dispatch => {
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
        dispatch({ type: FETCH_USER_ERROR, payload: json });
    }
}