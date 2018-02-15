import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    //"credentials include" is needed to get the user out of the passport session. 1h debugging. yay.
    //TODO: solve on server. if no user, the response can not be converted to json.
    try {
        const response = await fetch('/api/current_user', {credentials: 'include'});
        const json = await response.json();
        dispatch({ type: FETCH_USER, payload: json });
    } catch(err) {
        return;
    }
};