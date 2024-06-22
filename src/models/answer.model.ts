import mongoose, { Document, Schema, Model } from 'mongoose';

interface IAnswer extends Document {
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const answerSchema: Schema = new mongoose.Schema({
    question_id: {
        type: String,
        required: [true, 'question_id of the answer cannot be empty']
    },
    text: {
        type: String,
        required: [true, 'Text of the answer cannot be empty']
    },
    user_id: {
        type: String,
        required: [true, 'user_id of the answer cannot be empty']
    }
}, {
    timestamps: true as const
});

const Answer: Model<IAnswer> = mongoose.model<IAnswer>('answers', answerSchema);
module.exports = Answer;