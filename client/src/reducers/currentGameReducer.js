import { 
    GAME_TIMER,
    MULTIPLAYER_COUNT_DOWN,
    MULTIPLAYER_START,
    RESET_GAME,
    UPDATE_GAME_STAT,
    INIT_MULTIPLAYER_GAME_PLAYERS
} from '../actions/currentGameActions';

const initialState = {
    time: 10,
    keystrokes: 0,
    correctWords: 0,
    incorrectWords: 0,
    gameIsReady: false,
    gameIsRunning: false,
    multiPlayerCountDown: 3,
    opponent: {},
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GAME_TIMER:
            return {
                ...state,
                time: action.payload
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
            console.log(initialState);
            return initialState;
        case UPDATE_GAME_STAT:
            //TODO: known issue. "time" from practice-side-bar will come as a string.
            //because of this, things work (look below). lol. however it should be changed.
            //sometime.
            const stateCopy = Object.assign({}, state);
            if(Number.isInteger(action.payload.value))
                stateCopy[action.payload.target] += action.payload.value;
            else
                stateCopy[action.payload.target] = action.payload.value
            return {
                ...stateCopy
            }
        default:
            return state;
    }
}