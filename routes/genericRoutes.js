//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const WordList = mongoose.model('words');
const Score = mongoose.model('scores');


module.exports = app => {
    //TODO: requireLogin middleware    
    app.get('/api/scores/:userId', async (req, res) => {
        const scores = await Score.find({ _user: req.params.userId });
        res.send(scores);
    });

    app.post('/api/scores/:userId', async (req, res) => {
        console.log(req.user);
        const { correctWords, incorrectWords, keystrokes } = req.body;
        const newScore = new Score({
            correctWords,
            incorrectWords,
            keystrokes,
            _user: req.params.userId
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