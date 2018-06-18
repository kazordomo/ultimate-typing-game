// import { authenticateUser } from '../components/auth/authFuncs';
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'; 
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_ERROR = 'DELETE_ACCOUNT_ERROR';

const requestUser = () => ({
    type: FETCH_USER_REQUEST
});

const receiveUser = user => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

const fetchUser = () => async dispatch => {
    dispatch(requestUser());
    const response = await fetch('/api/current_user', {credentials: 'include'});
    const json = await response.json();
    return dispatch(receiveUser(json));
}

const shouldFetchUser = state => {
    const user = state.user;
    
    if(!user.isAuthenticated)
        return true;
    if(Object.keys(user).length === 0)
        return true;
    if(user.isAuthenticated)
        return false;
    return false;
}

export const fetchUserIfNeeded = () => (dispatch, getState) => {
    if(shouldFetchUser(getState())) {
        return dispatch(fetchUser());
    }
}

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
    } else {
        dispatch({ type: FETCH_USER_ERROR, payload: json });
    }
}

export const deleteAccount = () => async dispatch => {
    const response = await fetch('/auth/deleteAccount', {
        credentials: 'include',
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.status === 204) {
        dispatch({ type: DELETE_ACCOUNT_SUCCESS });
    } else {
        dispatch({ type: DELETE_ACCOUNT_ERROR });
    }
}
