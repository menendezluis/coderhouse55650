import messageModel from "./message.schema.js";

export default class Messages {
  constructor() {}

  get = async () => {
    return await messageModel.find();
  };

  create = async () => {
    const newMessage = new messageModel(message);
    await newMessage.save();
    return newMessage;
  };

  modify = async (id, message) => {
    return await messageModel.finByIdAndUpdate(id, message, { new: true });
  };

  delete = async (id) => {
    return await messageModel.findByIdAndDelete(id);
  };
}