import { 
    FETCH_STATS_REQUEST,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_ERROR,
    FETCH_EXTERNAL_PLAYER_STATS_REQUEST } from '../actions/statsActions';
import { 
    POST_SCORE_SUCCESS, 
    POST_SCORE_ERROR 
} from '../actions/scoreActions';
import { calculateStats } from '../utils';

export default (state = { 
    isFetched: false,
    stats: {},
    scores: [],
    isExternalPlayerStats: false,
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_STATS_REQUEST:
            return {
                ...state,
                isFetched: false,
                isExternalPlayerStats: false
            }
        case FETCH_EXTERNAL_PLAYER_STATS_REQUEST:
            return {
                ...state,
                isFetched: false,
                isExternalPlayerStats: true
            }
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                scores: action.payload,
                data: calculateStats(action.payload, null)
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
                    data: calculateStats(state.scores, action.payload)
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