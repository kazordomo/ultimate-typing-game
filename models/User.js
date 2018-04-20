const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;
const WordListSchema = require('./WordList');

//TODO: the username should not be nested and always be required. if logged in from social media it should be the full name.
const userSchema = new Schema({
    facebook: {
        id: String,
        token: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        username: String
    },
    local: {
        username: {
            type: String,
            unique: true,
            trim: true
        },
        password: String
    },
    createdDate: { type: Date, default: Date.now },
    createdWordLists: [WordListSchema]
});


userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = (password, storedPassword) => {
    return bcrypt.compareSync(password, storedPassword);
};

mongoose.model('users', userSchema);