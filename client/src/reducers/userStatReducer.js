import { 
    FETCH_USER_STATS_REQUEST,
    FETCH_USER_STATS_SUCCESS,
    FETCH_USER_STATS_ERROR
    
} from '../actions/userStatActions';
import { 
    POST_SCORE_SUCCESS, 
    POST_SCORE_ERROR 
} from '../actions/scoreActions';

function calculateUserStats(scores, payload) {
    if(payload)
        scores.push(payload);

    const multiplayerGames = scores.filter(score => score.multiplayerGame);
    const multiplayerWins = multiplayerGames.filter(score => score.multiplayerWin);
    const sumTotal = stat => scores.reduce((a, c) => a + c[stat], 0);

    return {
        correctWords: sumTotal('correctWords'),
        wpm: Math.round(sumTotal('correctWords') / scores.length),
        incorrectWords: sumTotal('incorrectWords'),
        keystrokes: sumTotal('keystrokes'),
        topFive: scores.sort((a, b) => b.correctWords - a.correctWords).slice(0, 5),
        totalGames: scores.length,
        totalMultiplayerGames: multiplayerGames.length,
        totalMultiplayerWins: multiplayerWins.length
    }
}

export default (state = { 
    isFetched: false,
    stats: {},
    scores: [], //needed to calculate the stats
    error: false
}, action) => {
    switch (action.type) {
        case FETCH_USER_STATS_REQUEST:
            return {
                ...state,
                isFetched: false
            }
        case FETCH_USER_STATS_SUCCESS:
            return {
                ...state,
                isFetched: true,
                scores: action.payload,
                stats: calculateUserStats(action.payload, null)
            }
        case FETCH_USER_STATS_ERROR:
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
                    stats: calculateUserStats(state.scores, action.payload)
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