import { combineReducers } from 'redux';
import user from './userReducer';
import stats from './statsReducers';
import wordLists from './wordListReducer';
import topScores from './scoreReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
    user,
    stats,
    form,
    wordLists,
    topScores,
});