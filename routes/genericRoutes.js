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
            username: req.user.displayName,
            _user: req.user.id
        });
        await newScore.save();
        res.send(newScore);
    });

    app.get('/api/user/scores/:id', requireLogin, async (req, res) => {
        const scores = await Score.find({ '_user': { $in: mongoose.Types.ObjectId(req.params.id) } });
        res.send(scores);
    });

    app.get('/api/wordLists/all', requireLogin, async (req, res) => {
        const wordLists = await WordList.find({'isPublic': true});
        res.send(wordLists);
    });

    app.get('/api/wordLists/user', requireLogin, async (req, res) => {
        const favoredIds = req.user.favoredWordLists;
        const wordLists = await WordList.find({ 
            $or: [
                { '_user': { $in: mongoose.Types.ObjectId(req.user.id) } }, 
                { '_id': { $in: favoredIds }}
            ] 
        });
        res.send(wordLists);
    });

    app.get('/api/wordList/:id', requireLogin, async (req, res) => {
        let wordList = await WordList.findById(req.params.id);
        res.send(wordList);
    });

    app.put('/api/wordList/:id', requireLogin, async (req, res) => {
        let wordList = await WordList.findById(req.params.id);
        const userAlreadyRated = wordList.ratings.find(rating => rating._user.toString() === req.user.id );
        if(req.body.rating && wordList._user.toString() === req.user.id) {
            return res.status(400).json({ 
                success: false,
                status: 400, 
                message: 'You can not rate your own list.' 
            });
        } else if(userAlreadyRated) {
            return res.status(400).json({ 
                success: false,
                status: 400, 
                message: 'You have already rated this list.'
            });
        }

        const rating = req.body.rating ? 
                { _user: req.user.id, value: req.body.rating } : null;
        wordList.name = req.body.name;
        wordList.words = req.body.words;
        wordList.labels = req.body.labels;
        wordList.isPublic = req.body.isPublic;
        rating && wordList.ratings.push(rating);
        wordList.save();
        res.send(wordList);
    })

    app.post('/api/wordList', requireLogin, async (req, res) => {
        const { name, words, isPublic, labels } = req.body;

        if(name.length === 0) {
            return res.status(400).json({ 
                success: false,
                status: 400, 
                message: 'The list needs a name.' 
            });
        } else if(words.length === 0) {
            return res.status(400).json({ 
                success: false,
                status: 400, 
                message: 'The list needs at least one word.' 
            });
        }

        const newWordList = new WordList({
            name,
            words,
            labels,
            isPublic,
            _user: req.user.id
        });
        await newWordList.save();
        res.send(newWordList);
    });

    app.post('/api/wordList/user/favor', requireLogin, (req, res) => {
        req.user.favoredWordLists.push(req.body.wordListId);
        req.user.save();
        res.status(200).end();
    });

    app.delete('/api/wordList/user/favor', requireLogin, (req, res) => {
        let wordLists = req.user.favoredWordLists;
        let wordList = wordLists.find(list => list.id === req.body.wordListId);
        wordLists.splice(wordLists.indexOf(wordList), 1);
        req.user.save();
        res.status(200).end();
    });

    app.delete('/api/wordList/:id', requireLogin, async (req, res) => {
        try {
            await WordList.deleteOne({_id: req.params.id});
            res.status(200).end();
        } catch(err) {
            res.status(400).json(err);
        }
    });
}