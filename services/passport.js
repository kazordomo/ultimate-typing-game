const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); //we init user before passport in index, meaning we can access this directly from here.

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});


//TODO: FIX THIS MESS.
function validateExistingUser({ id }) {
    User.findOne({
        $or: [
            { googleId: id },
            { facebookId: id }
        ]
    });
}

//TODO: the user will be created twice right now if the user use both strategies.
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true //if heroku - let herokus proxy end us https
}, async (accessToken, refreshToken, profile, done, strategy) => {
    // const existingUser = await validateExistingUser(profile);
    const existingUser = await User.findOne({ facebookId: profile.id });
    if(existingUser) {
        return done(null, existingUser);
    }

    const user = await new User({ facebookId: profile.id }).save();
    done(null, user);
}));

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await validateExistingUser(profile);
    console.log(existingUser);
    if(existingUser) {
        return done(null, existingUser);
    }
    
    const user = await new User({ googleId: profile.id }).save();
    done(null, user);
}));