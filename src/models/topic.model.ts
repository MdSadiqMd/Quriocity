import mongoose, { Document, Schema, Model } from "mongoose";

interface ITopic extends Document {
    name: String;
}

const topicSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name of the topic cannot be empty']
    }
});

const Topic: Model<ITopic> = mongoose.model<ITopic>('topics', topicSchema);
module.exports = Topic;