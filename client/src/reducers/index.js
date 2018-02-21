import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    user: authReducer,
    error: errorReducer,
    form: formReducer
});