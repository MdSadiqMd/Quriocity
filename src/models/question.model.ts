import mongoose, { Document, Schema, Model } from 'mongoose';

interface IQuestion extends Document {
    id: string;
    title: string;
    body: string;
    topics: string[];
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const questionSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the question cannot be empty']
    },
    title: {
        type: String,
        required: [true, 'Title of the question cannot be empty']
    },
    body: {
        type: String,
        required: [true, 'Body of the question cannot be empty']
    },
    topics: [
        {
            type: String,
            required: [true, 'Topics of the question cannot be empty']
        }
    ],
    user_id: {
        type: String,
        required: [true, 'User ID of the question cannot be empty']
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

const Question: Model<IQuestion> = mongoose.model<IQuestion>('questions', questionSchema);
module.exports = Question;