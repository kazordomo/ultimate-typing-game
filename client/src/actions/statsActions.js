export const FETCH_STATS_REQUEST = 'FETCH_STATS_REQUEST';
export const FETCH_STATS_SUCCESS = 'FETCH_STATS_SUCCESS';
export const FETCH_STATS_ERROR = 'FETCH_STATS_ERROR';
export const FETCH_EXTERNAL_PLAYER_STATS_REQUEST = 'FETCH_EXTERNAL_PLAYER_STATS_REQUEST';

const requestStats = () => ({
    type: FETCH_STATS_REQUEST
});

const requestExternalPlayerStats = () => ({
    type: FETCH_EXTERNAL_PLAYER_STATS_REQUEST
});

const receiveStats = data => ({
    type: FETCH_STATS_SUCCESS,
    payload: data
});


const fetchStats = (id, isExternal) => async dispatch => {
    isExternal ? dispatch(requestExternalPlayerStats()) : dispatch(requestStats());
    const response = await fetch(`/api/user/scores/${id}`, { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveStats(json));
}

const shouldfetchStats = (state, isExternal) => {
    const stats = state.stats;
    if(isExternal)
        return true;
    if(stats.isExternalPlayerStats)
        return true;
    if(stats.isFetched)
        return false;
    return true;
}

export const fetchStatsIfNeeded = (id, isExternal) => (dispatch, getState) => {
    if(shouldfetchStats(getState(), isExternal)) {
        return dispatch(fetchStats(id, isExternal));
    }
}