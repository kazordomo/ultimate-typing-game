import { 
    FETCH_TOP_SCORES_REQUEST,
    FETCH_TOP_SCORES_SUCCESS,
    FETCH_TOP_SCORES_ERROR,
    POST_SCORE_SUCCESS
} from '../actions/scoreActions';

export default (state = { 
    isFetched: false,
    leaderboards: {} 
}, action) => {
    switch (action.type) {
        case FETCH_TOP_SCORES_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_TOP_SCORES_SUCCESS:
            return {
                ...state,
                isFetched: true,
                leaderboards: action.payload
            }
        case FETCH_TOP_SCORES_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load scores' }
            }
        default:
            return state;
    }
};