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


function validateExistingUser(profile, cb) {
    const existingUser = User.findOne({
        $or: [
            { googleId: profile.id },
            { facebookId: profile.id }
        ]
    });

    if(existingUser) {
        return done(null, existingUser)
    }
}

//TODO: refactor this whole chabang.
//we whould do most of the logic in validate-function. for now we only check either
//googleId or facebookId. we should check for both and update the user with the providerId
//if it does not exist.
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    proxy: true //if heroku - let herokus proxy end us https
}, async (accessToken, refreshToken, profile, done) => {
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
    console.log(req);
    const existingUser = await validateExistingUser(profile);
    // if(existingUser) {
    //     return done(null, existingUser);
    // }
    
    const user = await new User({ googleId: profile.id }).save();
    done(null, user);
}));