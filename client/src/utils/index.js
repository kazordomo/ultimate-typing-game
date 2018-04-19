export function shuffleWords(arr) {
    const words = arr.words
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);
    return { name: arr.name, words };
};

export function arrayToObj(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr._id] = curr;
        return acc;
    }, {});
}

export function calculateStats(scores, payload) {
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