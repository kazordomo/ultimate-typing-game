const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Score = mongoose.model('scores');
const User = mongoose.model('users');
const WordList = mongoose.model('wordLists');


module.exports = app => {

    app.get('/api/scores', requireLogin, async (req, res) => {
        let start = new Date(); //TODO: UTC, will get 22:00 the day before in swedenland
        start.setHours(0,0,0,0);
        let end = new Date();
        end.setHours(23,59,59,999);

        //TODO: fetch and limit twice, or check all and then seperate the scores? what is best for resources?
        const topScores = await Score.find({}).sort({'correctWords': -1}).limit(50).exec();
        const topScoresToday = await Score.find({'scoreDate': {'$gte': start, '$lt': end}}).sort({'correctWords': -1}).limit(50).exec();
        const leaderboards = { topScores, topScoresToday };
        res.send(leaderboards);
    });

    app.post('/api/scores', requireLogin, async (req, res) => {
        const { correctWords, incorrectWords, keystrokes } = req.body;
        const newScore = new Score({
            correctWords,
            incorrectWords,
            keystrokes,
            perfectGame: incorrectWords ? false : true,
            multiplayerGame: req.body.multiplayerGame ? true : false,
            multiplayerWin: req.body.multiplayerWin ? req.body.multiplayerWin : false,
            username: req.user.local.username,
            _user: req.user.id
        });
        await newScore.save();
        res.send(newScore);
    });

    app.get('/api/wordLists/all', requireLogin, async (req, res) => {
        const wordLists = await WordList.find({'isPublic': true});
        res.send(wordLists);
    });

    app.get('/api/wordLists/user', requireLogin, async (req, res) => {
        const wordList = await WordList.find({ '_user': { $in: mongoose.Types.ObjectId(req.user.id) } });
        res.send(wordList);
    });

    app.get('/api/wordList/:id', requireLogin, async (req, res) => {
        let wordList = await WordList.findById(req.params.id);
        res.send(wordList);
    });

    app.put('/api/wordList/:id', requireLogin, async (req, res) => {
        let wordList = await WordList.findById(req.params.id);
        wordList.name = req.body.name;
        wordList.words = req.body.words;
        wordList.isPublic = req.body.isPublic;
        wordList.save();
    })

    app.post('/api/wordList', requireLogin, async (req, res) => {
        const { name, words, isPublic } = req.body;
        const newWordList = new WordList({
            name,
            words,
            isPublic,
            _user: req.user.id
        });
        await newWordList.save();
        res.send(newWordList);
    });

    app.delete('/api/wordList/:id', requireLogin, async (req, res) => {
        try {
            await WordList.deleteOne({_id: req.params.id});
            res.status(200).end();
        } catch(err) {
            res.status(400).end();
        }
    });

    app.get('/api/user/scores/:id', requireLogin, async (req, res) => {
        const scores = await Score.find({ '_user': { $in: mongoose.Types.ObjectId(req.params.id) } });
        res.send(scores);
    });
}