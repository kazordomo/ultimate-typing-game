const mongoose = require('mongoose');
const { Schema } = mongoose;

const wordListSchema = new Schema({
    name: { type: String, required: true, maxlength: 10, minlength: 1 },
    words: Array,
    isPublic: { type: Boolean, default: false },
    ratings: [{ 
        _user: { type: Schema.Types.ObjectId, ref: 'User' }, 
        value: Number,
        ratingDate: { type: Date, default: Date.now }
    }],
    labels: Array, //Max length of array.
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now }
});

mongoose.model('wordLists', wordListSchema);