import { 
    FETCH_LEADERBOARDS_REQUEST,
    FETCH_LEADERBOARDS_SUCCESS,
    FETCH_LEADERBOARDS_ERROR
} from '../actions/leaderboardsActions';

export default (state = { 
    isFetching: true, //TODO: should set isFetching to true when fetching only.
    leaderboards: {} 
}, action) => {
    switch (action.type) {
        case FETCH_LEADERBOARDS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_LEADERBOARDS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                leaderboards: action.payload
            }
        case FETCH_LEADERBOARDS_ERROR:
            return {
                ...state,
                isFetching: false,
                error: { status: 400, message: 'Could not load leaderboards' }
            }
        default:
            return state;
    }
};