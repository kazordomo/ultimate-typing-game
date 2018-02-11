const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
// const User = mongoose.model('users'); //we init user before passport in index, meaning we can access this directly from here.

passport.serializeUser((user, done) => {
        done(null. user);
    // done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true  //if heroku - let herokus proxy end us https
}, async (accessToken, refreshToken, profile, done) => {
    done(null, 'DONE');
    // const existingUser = await User.findOne({ googleId: profile.id });
    // if(existingUser) {
    //     return done(null, existingUser);
    // }
    
    // const user = await new User({ googleId: profile.id }).save();
    // done(null, user);
}));