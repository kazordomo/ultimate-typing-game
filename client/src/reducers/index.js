import { combineReducers } from 'redux';
import user from './userReducer';
import stats from './statsReducer';
import wordLists from './wordListReducer';
import globalWordLists from './globalWordListReducer';
import topScores from './scoreReducer';
import currentGame from './currentGameReducer';
import popup from './popupReducer';

export default combineReducers({
    user,
    stats,
    wordLists,
    globalWordLists,
    topScores,
    currentGame,
    popup,
});