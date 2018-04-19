const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    correctWords: Number,
    incorrectWords: Number,
    keystrokes: Number,
    perfectGame: Boolean,
    multiplayerGame: { type: Boolean, default: false },
    multiplayerWin: { type: Boolean, default: false },
    username: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    scoreDate: { type: Date, default: Date.now }
});

mongoose.model('scores', scoreSchema);