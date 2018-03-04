//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const WordList = mongoose.model('words');

module.exports = app => {
    //TODO: requireLogin middleware    
    app.get('/api/score', (req, res) => {
        console.log("score");
    });

    app.post('/api/score', (req, res) => {
        
    });

    app.get('/api/wordList', async (req, res) => {
        //TODO: create dynamic fetching for practice mode. standard will be used for single/multiplayer.
        const words = await WordList.findOne({ name: 'Standard' });
        res.send(words);
    });
}