const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordListSchema = new Schema({
    name: { type: String, required: true},
    words: Array
});

module.exports = wordListSchema;