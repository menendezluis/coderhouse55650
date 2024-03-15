//import this.dao. from "../../models/message.mongo.js";

export default class ChatService {
  constructor(dao) {
    this.dao = dao;
  }
  async createMessage(message) {
    try {
      const newMessage = await this.dao.create(message);

      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async findMessages() {
    try {
      const messages = await this.dao.find().lean();

      return messages;
    } catch (error) {
      throw error;
    }
  }
}
