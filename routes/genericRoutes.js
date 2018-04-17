const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Score = mongoose.model('scores');
const User = mongoose.model('users');


module.exports = app => {

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
        const { correctWords, incorrectWords, keystrokes } = req.body;
        const newScore = new Score({
            correctWords,
            incorrectWords,
            keystrokes,
            multiplayerGame: req.body.multiplayerGame ? true : false,
            multiplayerWin: req.body.multiplayerWin ? req.body.multiplayerWin : false,
            _user: req.user.id
        });
        await newScore.save();
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

    app.get('/api/user/scores', requireLogin, async (req, res) => {
        const userScores = await Score.find({ '_user': { $in: mongoose.Types.ObjectId(req.user.id) } });
        res.send(userScores);
    });
}