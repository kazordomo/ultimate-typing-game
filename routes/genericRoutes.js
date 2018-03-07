//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const WordList = mongoose.model('words');
const Score = mongoose.model('scores');


module.exports = app => {
    //TODO: requireLogin middleware    .
    //use req.user
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
        //TODO: create dynamic fetching for practice mode. standard will be used for single/multiplayer.
        const words = await WordList.findOne({ name: 'Standard' });
        res.send(words);
    });
}