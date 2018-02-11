const passport = require('passport');

module.exports = app => {
    //start the auth process.
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.send("SUCCESS");
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}