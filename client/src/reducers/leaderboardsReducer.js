import { 
    FETCH_LEADERBOARDS_REQUEST,
    FETCH_LEADERBOARDS_SUCCESS,
    FETCH_LEADERBOARDS_ERROR
} from '../actions/leaderboardsActions';

export default (state = { 
    isFetched: false,
    leaderboards: {} 
}, action) => {
    switch (action.type) {
        case FETCH_LEADERBOARDS_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_LEADERBOARDS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                leaderboards: action.payload
            }
        case FETCH_LEADERBOARDS_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load leaderboards' }
            }
        default:
            return state;
    }
};