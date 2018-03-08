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
        const { correctWords, incorrectWords, keystrokes } = req.body;
        const newScore = new Score({
            correctWords,
            incorrectWords,
            keystrokes,
            _user: req.user.id
        });
        await newScore.save();
        res.send(newScore);
    });

    app.get('/api/wordList', async (req, res) => {
        const words = await WordList.findOne({ name: 'Standard' });
        res.send(words);
    });

    app.post('/api/wordList', requireLogin, (req, res) => {
        const newWordList = req.body;
        req.user.createdWordLists.push(newWordList);
        req.user.save();
        res.send(req.user.createdWordLists);
    });
}