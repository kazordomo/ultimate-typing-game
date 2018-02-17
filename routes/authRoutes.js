const passport = require('passport');

module.exports = app => {
    //start the auth process.
    app.get('/auth/facebook', passport.authenticate('facebook'));

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

    app.post('/auth/login', (req, res) => {
        return passport.authenticate('local-login', (err, user) => {
            req.login(user, (err) => {
                res.send(user);
            });
        })(req, res);
    });

    app.post('/auth/signup', (req, res) => {
        return passport.authenticate('local-signup', (err, user) => {
            req.login(user, (err) => {
                res.send(user); //sending back credentials as well atm
            });
        })(req, res);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout(); //logout with passport
        res.redirect('/');
    });

    // //UNLINK
    // app.get('/unlink/facebook', (req, res) => {
    //     const user = req.user;
    //     user.facebook.token = undefined;
    //     user.save(() => {
    //         res.redirect('/success');
    //     });
    // });

    // app.get('/unlink/google', (req, res) => {
    //     const user = req.user;
    //     user.google.token = undefined;
    //     user.save(() => {
    //         res.redirect('/success');
    //     });
    // });

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
}