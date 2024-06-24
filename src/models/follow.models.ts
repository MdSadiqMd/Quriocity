import mongoose, { Schema, model, Document } from "mongoose";

interface IFollow extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    targetUserId: mongoose.Schema.Types.ObjectId;
}

const followSchema: Schema = new mongoose.Schema<IFollow>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The userId of Like cannot be empty']
    },
    targetUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'The targetUserId of Like cannot be empty']
    }
});

const Follow = model<IFollow>("follow", followSchema);
module.exports = Follow;