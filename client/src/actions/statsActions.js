export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';

const requestStats = () => ({
    type: FETCH_STATS_REQUEST
});

const receiveStats = data => ({
    type: FETCH_STATS_SUCCESS,
    payload: data
});

const fetchStats = id => async dispatch => {
    dispatch(requestStats());
    const response = await fetch(`/api/user/scores/${id}`, { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveStats(json));
}

const shouldfetchStats = state => {
    return true; //TODO: remove.
    const userStats = state.userStats;

    if(Object.keys(userStats.stats).length === 0)
        return true;
    if(userStats.isFetched)
        return false;
    return false;
}

export const fetchStatsIfNeeded = id => (dispatch, getState) => {
    if(shouldfetchStats(getState())) {
        return dispatch(fetchStats(id));
    }
}
