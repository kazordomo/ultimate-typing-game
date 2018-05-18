import { combineReducers } from 'redux';
import user from './userReducer';
import stats from './statsReducer';
import wordLists from './wordListReducer';
import globalWordLists from './globalWordListReducer';
import topScores from './scoreReducer';
import currentGame from './currentGameReducer';

export default combineReducers({
    user,
    stats,
    wordLists,
    globalWordLists,
    topScores,
    currentGame
});