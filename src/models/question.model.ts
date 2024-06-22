import mongoose, { Document, Schema, Model } from 'mongoose';

interface IQuestion extends Document {
    title: string;
    body: string;
    topics: string[];
    user_id: string;
}

const questionSchema: Schema = new mongoose.Schema({
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
    /* user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, */
}, {
    timestamps: true as const
});

const Question: Model<IQuestion> = mongoose.model<IQuestion>('questions', questionSchema);
module.exports = Question;