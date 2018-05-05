import { 
    FETCH_STATS_REQUEST,
    FETCH_STATS_SUCCESS,
    FETCH_STATS_ERROR,
    FETCH_EXTERNAL_PLAYER_STATS_REQUEST } from '../actions/statsActions';
import { 
    POST_SCORE_SUCCESS, 
    POST_SCORE_ERROR 
} from '../actions/scoreActions';

function calculateStats(scores, payload) {
    if(payload)
        scores.push(payload);

    const perfectGames = scores.filter(score => score.perfectGame);
    const multiplayerGames = scores.filter(score => score.multiplayerGame);
    const multiplayerWins = multiplayerGames.filter(score => score.multiplayerWin);
    const sumTotal = stat => scores.reduce((a, c) => a + c[stat], 0);

    return {
        correctWords: sumTotal('correctWords'),
        wpm: Math.round(sumTotal('correctWords') / scores.length),
        incorrectWords: sumTotal('incorrectWords'),
        keystrokes: sumTotal('keystrokes'),
        totalPerfectGames: perfectGames.length,
        topFive: scores.sort((a, b) => b.correctWords - a.correctWords).slice(0, 5),
        totalGames: scores.length,
        totalMultiplayerGames: multiplayerGames.length,
        totalMultiplayerWins: multiplayerWins.length
    }
}

export default (state = { 
    isFetched: false,
    data: {},
    scores: [],
    isExternalPlayerStats: false,
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_STATS_REQUEST:
            return {
                ...state,
                isFetched: false,
                isExternalPlayerStats: false
            }
        case FETCH_EXTERNAL_PLAYER_STATS_REQUEST:
            return {
                ...state,
                isFetched: false,
                isExternalPlayerStats: true
            }
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                scores: action.payload,
                data: calculateStats(action.payload, null)
            }
        case FETCH_STATS_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load scores' }
            }
        case POST_SCORE_SUCCESS:
            if(state.isFetched) {
                return {
                    ...state,
                    scores: [...state.scores, action.payload],
                    data: calculateStats(state.scores, action.payload)
                }
            }
            else
                return { ...state };
        case POST_SCORE_ERROR:
            return {
                ...state,
                isFetched: false,
                error: { status: 400, message: 'Could not load scores' }
            }
        default:
            return state;
    }
};