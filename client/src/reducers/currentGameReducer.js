import { 
    GAME_TIMER,
    MULTIPLAYER_COUNT_DOWN,
    MULTIPLAYER_START,
    RESET_GAME,
    UPDATE_GAME_STAT,
    UPDATE_PRACTICE_GAME_STATE,
    INIT_MULTIPLAYER_GAME_PLAYERS,
} from '../actions/currentGameActions';

const DEFAULT_GAME_TIME_LIMIT = 10;

const initialState = {
    time: DEFAULT_GAME_TIME_LIMIT,
    practiceTime: DEFAULT_GAME_TIME_LIMIT,
    keystrokes: 0,
    correctWords: 0,
    incorrectWords: 0,
    gameIsReady: false,
    gameIsRunning: false,
    multiPlayerCountDown: 3,
    gameReset: false,
    opponent: {},
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GAME_TIMER:
            //tired, should obvs not need to update both stats.
            return {
                ...state,
                time: action.payload,
                practiceTime: action.payload,
            }
        case MULTIPLAYER_COUNT_DOWN:
            return {
                ...state,
                multiPlayerCountDown: action.payload
            }
        case MULTIPLAYER_START:
            return {
                ...state,
                gameIsReady: true
            }
        case INIT_MULTIPLAYER_GAME_PLAYERS:
            return {
                ...state,
                user: action.payload.user,
                opponent: action.payload.opponent,
                gameIsReady: action.payload.gameIsReady
            }
        case RESET_GAME:
            return initialState;
        case UPDATE_GAME_STAT:
            //TODO: known issue. "time" from practice-side-bar will come as a string.
            //because of this, things work (look below). lol. however it should be changed.
            //sometime.
            const stateCopy = Object.assign({}, state);
            if(Number.isInteger(action.payload.value))
                stateCopy[action.payload.target] += action.payload.value;
            else
                stateCopy[action.payload.target] = action.payload.value;
            return {
                ...stateCopy
            }
        case UPDATE_PRACTICE_GAME_STATE:
            initialState[action.payload.target] = action.payload.value;
            return {
                ...state,
                practiceTime: action.payload.value,
            }
        default:
            return state;
    }
}