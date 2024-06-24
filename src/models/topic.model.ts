import mongoose, { Document, Schema, Model } from "mongoose";

interface ITopic extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    name: String;
}

const topicSchema: Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'user_id of the topic cannot be empty']
    },
    name: {
        type: String,
        required: [true, 'name of the topic cannot be empty']
    }
});

const Topic: Model<ITopic> = mongoose.model<ITopic>('topics', topicSchema);
module.exports = Topic;