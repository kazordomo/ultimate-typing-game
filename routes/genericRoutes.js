//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Score = mongoose.model('scores');
const User = mongoose.model('users');


module.exports = app => {
    app.get('/api/scores', requireLogin, async (req, res) => {
        const scores = await Score.find({ _user: req.user.id });
        res.send(scores);
    });

    app.post('/api/scores', requireLogin, async (req, res) => {
        const { correctWords, incorrectWords, keystrokes, win } = req.body;
        const newScore = new Score({
            correctWords,
            incorrectWords,
            keystrokes,
            _user: req.user.id
        });
        await newScore.save();
        if(win) {
            req.user.multiplayerWins = req.user.multiplayerWins + 1; 
            req.user.save();
        }
        res.send(newScore);
    });

    app.get('/api/wordList', (req, res) => {
        res.send(req.user.createdWordLists);
    });

    app.get('/api/wordList/:id', (req, res) => {
        const wordList = req.user.createdWordLists.find(list => list.id === req.params.id);
        res.send(wordList);
    });

    app.post('/api/wordList/:id', requireLogin, (req, res) => {
        let wordList = req.user.createdWordLists.find(list => list.id === req.params.id);
        wordList.name = req.body.name;
        wordList.words = req.body.words;
        req.user.save();
    })

    app.post('/api/wordList', requireLogin, (req, res) => {
        const newWordList = req.body;
        req.user.createdWordLists.push(newWordList);
        req.user.save();
        res.send(req.user.createdWordLists);
    });
}