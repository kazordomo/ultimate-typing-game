import { combineReducers } from 'redux';
import user from './userReducer';
import error from './errorReducer';
import wordLists from './wordListsReducer';
import wordList from './wordListReducer';
import leaderboards from './leaderboardsReducer';
import activeWordList from './activeWordListReducer';
import { reducer as form } from 'redux-form';

export default combineReducers({
    user,
    error,
    form,
    wordLists, //List all the word lists in practice //TODO: wordLists: array<id>
    wordList, //Edit a specific word list
    activeWordList, //Word list active in playmode
    leaderboards,
});