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

    app.post('/auth/login', (req, res, next) => {
        passport.authenticate('local-login', (err, user, info) => {
            if(err)
                return next(err);
            if(!user)
                return res.status(401).json( info );
            req.logIn(user, (err) => {
                if(err)
                    return next(err);
                res.send(user);
            });
        })(req, res);
    });

    app.post('/auth/signup', (req, res, next) => {
        passport.authenticate('local-signup', (err, user, info) => {
            if(err)
                return next(err);
            if(!user)
                return res.status(401).json( info );
            req.logIn(user, (err) => {
                if(err)
                    return next(err);
                res.send(user); //sending back credentials as well atm
            });
        })(req, res, next);
    });

    app.get('/api/current_user', (req, res) => {
        let user = req.user ? req.user : {}; //redo
        //TODO: think about pro/cons with exluding wordlists.
        res.send(user);
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