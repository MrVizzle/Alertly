const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        unique: true, //no duplicate usernames
        trim: true, //removes white space
    },
    lastName: {
        type: String,
        required: true,
        unique: true, //no duplicate usernames
        trim: true, //removes white space
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '',
        maxlength: 100,
        trim: true
    },
    profilePicture: {
        type: String,
        default: '' //URL to profile picture
    }

}, {timestamps: true});

const users = mongoose.model('users', userSchema);
module.exports = users; //export the users