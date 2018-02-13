const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    providerId: String,
    wpm: { type: Number, default: 0 },
    correctWords: { type: Number, default: 0 },
    wrongWords: { type: Number, default: 0 },
    perfectGames: { type: Number, default: 0 },
    multiplayerWins: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    createdDate: { type: Date, default: Date.now }
});

mongoose.model('users', userSchema);