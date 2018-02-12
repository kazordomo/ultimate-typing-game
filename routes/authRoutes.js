const passport = require('passport');

module.exports = app => {
    //TODO: remove.
    app.get('/success', (req, res) => {
        res.send('SUCCESS ROUTE');
    })

    app.get('/fail', (req, res) => {
        res.send('FAILED ROUTE');
    })

    //start the auth process.
    app.get('/auth/facebook', passport.authenticate('facebook')); //{ scope: ['read_stream', 'publish_actions', 'email'] }

    //TODO: change to proper routes.
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/success',
        failureRedirect: '/fail'
    }));

    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] //remove if we find no use for these.
    }));

    app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
        res.redirect('/success');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}