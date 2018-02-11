const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
// require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

//tell our app and passport to use cookie session.
// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 1000, //30 days
//         keys: [keys.cookieKey]
//     })
// );

app.use(passport.initialize());
// app.use(passport.session());

require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;
app.listen(port);
