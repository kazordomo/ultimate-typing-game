const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
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
            return done(null, user);
        }
        const newUser = await new User({ facebook: { id, token } }).save();
        return done(null, newUser);

    } else {
        const user = req.user;
        user.facebook.id = id;
        user.facebook.token = token;
        user.save();
        
        return done(null, user);
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
            return done(null, user);
        }
        const newUser = await new User({ google: { id, token } }).save();
        return done(null, newUser);

    } else {
        const user = req.user;
        user.google.id = id;
        user.google.token = token;
        user.save();
        
        return done(null, user);
    }
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    proxy: true
}, async (username, password, done) => {
    const user = await User.findOne({ local: { username } });
        if(user) {
            //TODO: return error that the username is already taken.
            done(null, false);
        }

        const newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        await newUser.save();
        done(null, newUser);
}));