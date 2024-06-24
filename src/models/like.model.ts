import mongoose, { Schema, model, Document } from "mongoose";

interface ILike extends Document {
    user_id: mongoose.Schema.Types.ObjectId;
    type: "questions" | "answers" | "comments";
    type_id: mongoose.Schema.Types.ObjectId;
}

const likeSchema: Schema = new mongoose.Schema<ILike>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The userId of Like cannot be empty']
    },
    type: {
        type: String,
        enum: ["questions", "answers", "comments"],
        required: [true, 'The type of Like cannot be empty'],
    },
    type_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The type_id cannot be empty']
    }
});

const Like = model<ILike>("likes", likeSchema);
module.exports = Like;