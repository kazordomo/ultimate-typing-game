import { 
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR
} from '../actions/userActions';

export default (state = { 
    isAuthenticated: false,
    data: {}, 
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                error: false,
            }
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload).length ? true : false,
                data: action.payload,
                error: false
            }
        case FETCH_USER_ERROR:
            return {
                ...state,
                isFetched: false,
                error: action.payload
            }
        default:
            return state;
    }
};