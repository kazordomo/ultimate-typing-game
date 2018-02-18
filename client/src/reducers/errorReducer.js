import { AUTH_ERROR, CLEAR_ERROR } from '../actions/types';

//TODO: why do we not get this in to state?!?!?!?!
export default (state = null, action) => {
    switch(action.type) {
        case AUTH_ERROR:
            return action.payload || false;
        case CLEAR_ERROR:
            return null;
        default:
            return state;
    }
};