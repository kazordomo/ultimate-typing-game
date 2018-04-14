//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Score = mongoose.model('scores');
const User = mongoose.model('users');


module.exports = app => {

    //TODO: api/scores/user, api/scores/all
    app.get('/api/scores/user', requireLogin, async (req, res) => {
        await Score.find({ _user: req.user.id }).sort({'correctWords': -1}).limit(5).exec((err, userScores) => {
            if(err)
                return err; //TODO: ERROR HANDLING
            res.send(userScores);
        });
        
    });

    app.get('/api/scores', requireLogin, async (req, res) => {
        let start = new Date(); //TODO: UTC, will get 22:00 the day before in swedenland
        start.setHours(0,0,0,0);
        let end = new Date();
        end.setHours(23,59,59,999);

        //TODO: fetch and limit twice, or check all and then seperate the scores? what is best for resources?
        const topScores = await Score.find({}).sort({'correctWords': -1}).limit(50).exec();
        const topScoresToday = await Score.find({"scoreDate": {"$gte": start, "$lt": end}}).sort({'correctWords': -1}).limit(50).exec();
        const leaderboards = { topScores, topScoresToday };
        res.send(leaderboards);
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

    app.get('/api/wordLists', requireLogin, (req, res) => {
        res.send(req.user.createdWordLists);
    });

    app.get('/api/wordList/:id', requireLogin, (req, res) => {
        const wordList = req.user.createdWordLists.find(list => list.id === req.params.id);
        res.send(wordList);
    });

    app.put('/api/wordList/:id', requireLogin, (req, res) => {
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

    app.delete('/api/wordList/:id', requireLogin, (req, res) => {
        let wordLists = req.user.createdWordLists;
        let wordList = wordLists.find(list => list.id === req.params.id);
        wordLists.splice(wordLists.indexOf(wordList), 1);
        req.user.save();
        res.send(wordLists);
    });
}