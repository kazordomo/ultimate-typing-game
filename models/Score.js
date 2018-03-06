const mongoose = require('mongoose');
const { Schema } = mongoose;

const scoreSchema = new Schema({
    correctWords: Number,
    incorrectWords: Number,
    keystrokes: Number,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    scoreDate: { type: Date, default: Date.now }
});

mongoose.model('scores', scoreSchema);