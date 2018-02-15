const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    facebook: {
        id: String,
        token: String
    },
    google: {
        id: String,
        token: String
    },
    local: {
        username: String,
        password: String
    },
    wpm: { type: Number, default: 0 },
    correctWords: { type: Number, default: 0 },
    wrongWords: { type: Number, default: 0 },
    perfectGames: { type: Number, default: 0 },
    multiplayerWins: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now }
});


userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.local.password);
};

mongoose.model('users', userSchema);