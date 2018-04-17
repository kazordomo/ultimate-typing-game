export const FETCH_TOP_SCORES_REQUEST = 'FETCH_SCORES_REQUEST';
export const FETCH_TOP_SCORES_SUCCESS = 'FETCH_SCORES_SUCCESS';
export const FETCH_TOP_SCORES_ERROR = 'FETCH_SCORES_ERROR';
export const POST_SCORE_SUCCESS = 'POST_SCORE_SUCCESS';
export const POST_SCORE_ERROR = 'POST_SCORE_ERROR';

const requestScores = () => ({
    type: FETCH_TOP_SCORES_REQUEST
});

const receiveScores = data => ({
    type: FETCH_TOP_SCORES_SUCCESS,
    payload: data
});

const fetchTopScores = () => async dispatch => {
    dispatch(requestScores());
    const response = await fetch('/api/scores', { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveScores(json));
}

const shouldFetchTopScores = state => {
    const topScores = state.topScores;

    if(Object.keys(topScores.leaderboards).length === 0)
        return true;
    if(topScores.isFetched)
        return false;
    return false;
}

export const fetchTopScoresIfNeeded = () => (dispatch, getState) => {
    if(shouldFetchTopScores(getState())) {
        return dispatch(fetchTopScores());
    }
}

export const submitScore = score => async dispatch => {
    const response = await fetch('/api/scores', { 
        credentials: 'include',
        method: 'post', 
        body: JSON.stringify(score),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    dispatch({ type: POST_SCORE_SUCCESS, payload: json });
}