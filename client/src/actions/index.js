import { FETCH_USER } from './types';

export const fetchUser = () => {
    //redux-thunks - dispatch function when request is done.
    return function(dispatch) {
        //refactor to async/await
        fetch('/api/current_user').then(response => {
            return response.json();
        }).then(data => {
            dispatch({ type: FETCH_USER, payload: data });
        });
    }
};