export const FETCH_USER_STATS_REQUEST = 'FETCH_USER_STATS_REQUEST';
export const FETCH_USER_STATS_SUCCESS = 'FETCH_USER_STATS_SUCCESS';
export const FETCH_USER_STATS_ERROR = 'FETCH_USER_STATS_ERROR';

const requestUserStats = () => ({
    type: FETCH_USER_STATS_REQUEST
});

const receuveUserStats = data => ({
    type: FETCH_USER_STATS_SUCCESS,
    payload: data
});

const fetchUserStats = () => async dispatch => {
    dispatch(requestUserStats());
    const response = await fetch('/api/user/scores', { credentials: 'include' });
    const json = await response.json();
    dispatch(receuveUserStats(json));
}

const shouldFetchUserStats = state => {
    const userStats = state.userStats;

    if(Object.keys(userStats.stats).length === 0)
        return true;
    if(userStats.isFetched)
        return false;
    return false;
}

export const fetchUserStatsIfNeeded = () => (dispatch, getState) => {
    if(shouldFetchUserStats(getState())) {
        return dispatch(fetchUserStats());
    }
}
