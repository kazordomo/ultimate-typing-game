import { 
    FETCH_STATS_REQUEST,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_ERROR
} from '../actions/statsActions';
import { 
    POST_SCORE_SUCCESS, 
    POST_SCORE_ERROR 
} from '../actions/scoreActions';
import { calculateUserStats } from '../utils';

export default (state = { 
    isFetched: false,
    stats: {},
    scores: [], //needed to calculate the stats
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_STATS_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                scores: action.payload,
                stats: calculateUserStats(action.payload, null)
            }
        case FETCH_STATS_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load scores' }
            }
        case POST_SCORE_SUCCESS:
            if(state.isFetched) {
                return {
                    ...state,
                    scores: [...state.scores, action.payload],
                    stats: calculateUserStats(state.scores, action.payload)
                }
            }
            else
                return { ...state };
        case POST_SCORE_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load scores' }
            }
        default:
            return state;
    }
};