import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the user cannot be empty']
    },
    username: {
        type: String,
        required: [true, 'Username of the user cannot be empty']
    },
    email: {
        type: String,
        required: [true, 'Email of the user cannot be empty']
    },
    bio: {
        type: String,
        required: false,
    }
});

const User = mongoose.model('users', userSchema);
module.exports = User;