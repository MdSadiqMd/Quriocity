import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    bio?: string;
}

const userSchema: Schema = new mongoose.Schema({
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

const User: Model<IUser> = mongoose.model<IUser>('users', userSchema);
module.exports = User;