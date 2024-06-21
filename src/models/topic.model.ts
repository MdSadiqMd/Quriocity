import mongoose, { Document, Schema, Model } from "mongoose";

interface ITopic extends Document {
    id: String;
    name: String;
}

const topicSchema: Schema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'id of topic cannot be empty']
    },
    name: {
        type: String,
        required: [true, 'name of the topic cannot be empty']
    }
});

const Topic: Model<ITopic> = mongoose.model<ITopic>('topics', topicSchema);
module.exports = Topic;