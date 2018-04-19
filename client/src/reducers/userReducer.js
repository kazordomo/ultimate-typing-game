import { 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} from '../actions/userActions';

export default (state = { 
    isFetching: true, 
    user: {}, 
    isAuthenticated: false,
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                user: action.payload,
                isAuthenticated: true,
                error: false
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
};