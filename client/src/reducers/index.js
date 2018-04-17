import { combineReducers } from 'redux';
import user from './userReducer';
import userStats from './userStatReducer';
import wordLists from './wordListReducer';
import topScores from './scoreReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
    user,
    userStats,
    form,
    wordLists,
    topScores,
});