export const FETCH_TOP_SCORES_REQUEST = 'FETCH_SCORES_REQUEST';
export const FETCH_TOP_SCORES_SUCCESS = 'FETCH_SCORES_SUCCESS';
export const FETCH_TOP_SCORES_ERROR = 'FETCH_SCORES_ERROR';
export const FETCH_USER_TOP_SCORES_SUCCESS = 'FETCH_USER_TOP_SCORES_SUCCESS';
export const POST_SCORE_SUCCESS = 'POST_SCORE_SUCCESS';

const requestScores = () => ({
    type: FETCH_TOP_SCORES_REQUEST
});

const receiveScores = data => ({
    type: FETCH_TOP_SCORES_SUCCESS,
    payload: data
});

export const fetchTopScores = () => async dispatch => {
    dispatch(requestScores());
    const response = await fetch('/api/scores', { credentials: 'include' });
    const json = await response.json();
    dispatch(receiveScores(json));
}

export const fetchUserScores = () => async dispatch => {
    const response = await fetch('/api/scores/user', { credentials: 'include' });
    const json = await response.json();
    dispatch({ type: FETCH_USER_TOP_SCORES_SUCCESS, payload: json });
}

export const submitScore = score => async dispatch => {
    await fetch('/api/scores', { 
        credentials: 'include',
        method: 'post', 
        body: JSON.stringify(score),
        headers: { 'Content-Type': 'application/json' }
    });
    // dispatch({ type: POST_SCORE_SUCCESS, payload: json });
}