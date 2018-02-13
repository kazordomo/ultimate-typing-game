const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //we init User before passport in index, meaning we can access this directly from here.

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//DRY -> strategies - for simplicity this will not be refactored.
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true,
    proxy: true //if heroku - let herokus proxy server use https
}, async (req, token, refreshToken, { id }, done) => {
    if(!req.user) {
        const user = await User.findOne({ facebook: { id }});

        if(user) {
            done(null, user);
        }
        const newUser = await new User({ facebook: { id, token } }).save();
        done(null, newUser);

    } else {
        const user = req.user;
        user.facebook.id = id;
        user.facebook.token = token;
        user.save();
        
        done(null, user);
    }
}));

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true,
    proxy: true
}, async (req, token, refreshToken, { id }, done) => {   
    if(!req.user) {
        const user = await User.findOne({ google: { id }});

        if(user) {
            done(null, user);
        }
        const newUser = await new User({ google: { id, token } }).save();
        done(null, newUser);

    } else {
        const user = req.user;
        user.google.id = id;
        user.google.token = token;
        user.save();
        
        done(null, user);
    }
}));