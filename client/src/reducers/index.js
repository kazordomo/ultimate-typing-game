import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import wordsReducer from './wordsReducer';
import topScoresReducer from './topScoresReducer';
import activeWordListReducer from './activeWordListReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    user: authReducer,
    error: errorReducer,
    form: formReducer,
    wordLists: wordsReducer,
    activeWordList: activeWordListReducer,
    scores: topScoresReducer,
});