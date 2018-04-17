const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    correctWords: Number,
    incorrectWords: Number,
    keystrokes: Number,
    multiplayerGame: { type: Boolean, default: false },
    multiplayerWin: { type: Boolean, default: false },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    scoreDate: { type: Date, default: Date.now }
});

mongoose.model('scores', scoreSchema);