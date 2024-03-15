import mongoose from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: { type: String, required: true, max: 100 },
    message: { type: String, required: true, max: 100 },
}, { timestamps: true });

const Message = mongoose.model(messageCollection, messageSchema);

export default Message;