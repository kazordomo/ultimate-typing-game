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

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true //if heroku - let herokus proxy server use https
}, async (token, refreshToken, { id }, done) => {
    debugger;
    const user = await User.findOne({ 'facebook.id': id });

    if(user) {
        return done(null, user);
    }
    // const username = firstName + lastName;    
    const newUser = await new User({ facebook: { id, token } }).save();
    return done(null, newUser);
}));

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (token, refreshToken, { id }, done) => { 
    const user = await User.findOne({ 'google.id': id });

    if(user) {
        return done(null, user);
    }
    // const username = firstName + lastName;
    const newUser = await new User({ google: { id, token } }).save();
    return done(null, newUser);
}));


//LOCAL SIGNUP
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true, 
    proxy: true
}, async (req, username, password, done) => {
    try {
        const user = await User.findOne({ 'local.username': username });
        if(user) {
            return done(null, false, { success: false, status: 400, message: 'User already exists.' });
        }
        if(req.body.password !== req.body.retypepassword) {
            return done(null, false, { success: false, status: 400, message: 'The passwords do not match.' });
        }
        const newUser = new User();
        newUser.local.username = username;
        newUser.local.email = req.body.email;
        newUser.local.password = newUser.generateHash(password);
        await newUser.save();
        return done(null, newUser);
    } catch(err) {
        return done(err);
    }
}));

//LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    proxy: true
}, async (username, password, done) => {
    try {
        const user = await User.findOne({ 'local.username': username });
        if(!user) {
            return done(null, false, { success: false, status: 404, message: 'User does not exist.' });
        }
        if(!user.validPassword(password, user.local.password)) {
            return done(null, false, { success: false, status: 401, message: 'Incorrect password' });
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
}));