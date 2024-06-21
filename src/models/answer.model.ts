import mongoose, { Document, Schema, Model } from 'mongoose';

interface IAnswer extends Document {
    id: string;
    question_id: string;
    text: string;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const answerSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the answer cannot be empty']
    },
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
    timestamps: { createdAt: 'created_at' }
});

const Answer: Model<IAnswer> = mongoose.model<IAnswer>('answers', answerSchema);
module.exports = Answer;