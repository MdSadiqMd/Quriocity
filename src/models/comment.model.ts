import mongoose, { Document, Schema, Model } from 'mongoose';

interface IComment extends Document {
    id: string;
    parent_id: string;
    text: string;
    createdAt?: Date;
    user_id: string;
}

const commentSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Id of the comment cannot be empty']
    },
    parent_id: {
        type: String,
        required: [true, 'Parent ID of the comment cannot be empty']
    },
    text: {
        type: String,
        required: [true, 'Text of the comment cannot be empty']
    },
    user_id: {
        type: String,
        required: [true, 'User ID of the comment cannot be empty']
    }
}, {
    timestamps: { createdAt: 'created_at' }
});

const Comment: Model<IComment> = mongoose.model<IComment>('comments', commentSchema);
module.exports = Comment;