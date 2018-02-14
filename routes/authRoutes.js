const passport = require('passport');

module.exports = app => {
    //start the auth process.
    app.get('/auth/facebook', passport.authenticate('facebook'));

    //TODO: change to proper routes.
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/dashboard',
        failureRedirect: '/error'
    }));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] //remove if we find no use for these.
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/error'
    }));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}