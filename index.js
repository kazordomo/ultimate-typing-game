const express = require('express');
const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/WordList');
require('./models/Score');
require('./services/passport');

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json());

app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 1000, //30 days
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session()); //tell passport to handle our session.

require('./routes/authRoutes')(app);
require('./routes/genericRoutes')(app);

const port = process.env.PORT || 5000;
app.set('port', port);
server.listen(port);

require('./services/websocket')(server);
