const passport = require('passport');

module.exports = app => {
    //TODO: remove.
    //TODO: error handling.
    app.get('/success', (req, res) => {
        res.send('SUCCESS ROUTE');
    })

    app.get('/fail', (req, res) => {
        res.send('FAILED ROUTE');
    })

    // AUTHANTEICATE (first login)
    //start the auth process.
    app.get('/auth/facebook', passport.authenticate('facebook'));

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

    // AUTHORIZE (already loggedin / connect other social account
    // app.get('/connect/facebook', passport.authorize('facebook'));

    // app.get('/connect/facebook/callback', passport.authorize('facebook', {
    //     successRedirect: '/success',
    //     failureRedirect: '/fail'
    // }));

    // app.get('/connect/google', passport.authorize('google', 
    //     { scope : ['profile', 'email'] 
    // }));

    // app.get('/connect/google/callback', passport.authorize('google', {
    //     successRedirect : '/profile',
    //     failureRedirect : '/'
    // }));

    // app.get('/api/current_user', (req, res) => {
    //     res.send(req.user);
    // });

    //UNLINK
    app.get('/unlink/facebook', (req, res) => {
        const user = req.user;
        user.facebook.token = undefined;
        user.save(() => {
            res.redirect('/success');
        });
    });

    app.get('/unlink/google', (req, res) => {
        const user = req.user;
        user.google.token = undefined;
        user.save(() => {
            res.redirect('/success');
        });
    });
}