const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordListSchema = new Schema({
    name: { type: String, required: true},
    words: Array,
    isPublic: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
});

mongoose.model('wordLists', wordListSchema);