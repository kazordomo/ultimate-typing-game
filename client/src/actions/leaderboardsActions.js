export const FETCH_LEADERBOARDS_REQUEST = 'FETCH_LEADERBOARDS_REQUEST';
export const FETCH_LEADERBOARDS_SUCCESS = 'FETCH_LEADERBOARDS_SUCCESS';
export const FETCH_LEADERBOARDS_ERROR = 'FETCH_LEADERBOARDS_ERROR';

//TODO:
//we could fetch all the different data displaying in the different leaderboards and
//then do synch actions to retrieve the different data from the object.

const requestLeaderboards = () => ({
    type: FETCH_LEADERBOARDS_REQUEST
});

const receiveLeaderboards = data => ({
    type: FETCH_LEADERBOARDS_SUCCESS,
    payload: data
});

export const fetchLeaderboards = () => {
    return async dispatch => {
        dispatch(requestLeaderboards());
        const response = await fetch('/api/scores', { credentials: 'include' });
        const json = await response.json();
        return dispatch(receiveLeaderboards(json));
    }
}