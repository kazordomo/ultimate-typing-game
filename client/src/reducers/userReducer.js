import { 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} from '../actions/userActions';

export default (state = { 
    isFetching: true, 
    user: {} 
}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: { status: 400, message: 'Could not find user' }
            }
        default:
            return state;
    }
};