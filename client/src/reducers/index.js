import { combineReducers } from 'redux';
import user from './userReducer';
import error from './errorReducer';
import wordLists from './wordListReducer';
import topScores from './scoreReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
    user,
    error,
    form,
    wordLists, //List all the word lists in practice //TODO: wordLists: array<id>
    topScores,
});