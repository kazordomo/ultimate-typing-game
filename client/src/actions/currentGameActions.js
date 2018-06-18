export const GAME_TIMER = 'GAME_COUNT_DOWN';
export const MULTIPLAYER_COUNT_DOWN = 'MULTIPLAYER_COUNT_DOWN';
export const MULTIPLAYER_START = 'MULTIPLAYER_START';
export const RESET_GAME = 'RESET_GAME';
export const UPDATE_GAME_STAT = 'UPDATE_GAME_STAT';
export const UPDATE_PRACTICE_GAME_STATE = 'UPDATE_PRACTICE_GAME_STATE';
export const INIT_MULTIPLAYER_GAME_PLAYERS = 'INIT_MULTIPLAYER_GAME_PLAYERS';

export const gameTimer = time => dispatch => {
    dispatch({ type: GAME_TIMER, payload: time });
}

export const multiplayerCountDown = time => dispatch => {
    dispatch({ type: MULTIPLAYER_COUNT_DOWN, payload: time });
}

export const multiplayerStart = () => dispatch => {
    dispatch({ type: MULTIPLAYER_START });
}

export const initMultiplayerGamePlayers = players => dispatch => {
    dispatch({ type: INIT_MULTIPLAYER_GAME_PLAYERS, payload: players });
}

export const resetGame = () => dispatch => {
    dispatch({ type: RESET_GAME });
}

export const updateStat = stat => dispatch => {
    dispatch({ type: UPDATE_GAME_STAT, payload: stat });
}

export const updatePracticeStat = stat => dispatch => {
    dispatch({ type: UPDATE_PRACTICE_GAME_STATE, payload: stat });
}