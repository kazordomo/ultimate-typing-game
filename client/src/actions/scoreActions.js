export const FETCH_TOP_SCORES_REQUEST = 'FETCH_SCORES_REQUEST';
export const FETCH_TOP_SCORES_SUCCESS = 'FETCH_SCORES_SUCCESS';
export const FETCH_TOP_SCORES_ERROR = 'FETCH_SCORES_ERROR';
export const FETCH_USER_TOP_SCPRES_SUCCESS = 'FETCH_USER_TOP_SCPRES_SUCCESS';
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

//TODO: we could do this sync, because we already got all the scores in the store.
export const fetchUserScores = () => async dispatch => {
    const response = await fetch('/api/scores/user', { credentials: 'include' });
    const json = await response.json();
    dispatch({ type: FETCH_USER_TOP_SCPRES_SUCCESS, payload: json });
}

export const submitScore = score => async dispatch => {
    const response = fetch('/api/scores', { 
        credentials: 'include',
        method: 'post', 
        body: JSON.stringify(score),
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    //we could add it to the topScores and then calc if it is in top 50 or not.
    //the leaderboards are always fetched however, so implement later with caching
    // dispatch({ type: POST_SCORE_SUCCESS, payload: json }); //?
}