import { 
    FETCH_TOP_SCORES_REQUEST,
    FETCH_TOP_SCORES_SUCCESS,
    FETCH_TOP_SCORES_ERROR,
    POST_SCORE_SUCCESS,
    POST_SCORE_ERROR
    
} from '../actions/scoreActions';

function sortLeaderboards(leaderboards, payload) {
    const tempLeaderboards = leaderboards;
    Object.keys(tempLeaderboards).forEach(key => {
        tempLeaderboards[key].push(payload);
        tempLeaderboards[key] = 
            tempLeaderboards[key]
            .sort((a, b) => b.correctWords - a.correctWords)
            .slice(0, 50);
    });
    return tempLeaderboards;
}

export default (state = { 
    isFetched: false,
    leaderboards: {},
    error: false
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
        case POST_SCORE_SUCCESS:
            return {
                ...state,
                leaderboards: state.isFetched ? sortLeaderboards(state.leaderboards, action.payload) : {}
            }
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