export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'; 

const requestUser = () => ({
    type: FETCH_USER_REQUEST
});

const receiveUser = user => ({
    type: FETCH_USER_SUCCESS,
    payload: user
});

//TODO: if we are going to store wordlists and userscores on the user object in store, we need to
//update it each time a change happens. one way to do this is to implement "invalidate_user" or something.
//maybe we could run it if the getState().user does not match the user object we get back from the payload?

const fetchUser = () => async dispatch => {
    dispatch(requestUser());
    const response = await fetch('/api/current_user', {credentials: 'include'});
    const json = await response.json();
    return dispatch(receiveUser(json));
}

const shouldFetchUser = state => {
    const user = state.user;
    
    if(!user.isFetched)
        return true;
    if(Object.keys(user).length === 0)
        return true;
    if(user.isFetched)
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
        // history.push('/dashboard');
    } else {
        dispatch({ type: FETCH_USER_ERROR, payload: json });
    }
}
