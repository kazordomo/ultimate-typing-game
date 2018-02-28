//TODO. refactor into gameRoutes, statisticRoutes/leaderboardRoutes, userRoutes...
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
    app.get('/api/score', (req, res) => {
        console.log("score");
    });

    app.post('/api/score', (req, res) => {
        
    });
}