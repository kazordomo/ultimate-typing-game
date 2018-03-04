const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordListSchema = new Schema({
    wordList: [{
        name: String,
        words: Array
    }]
});

mongoose.model('words', wordListSchema);