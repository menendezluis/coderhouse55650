export default class ChatRepository {
  constructor(model) {
    this.messageModel = model;
  }

  async create(message) {
    try {
      const newMessage = await this.messageModel.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async get(searchParams) {
    try {
      const messages = await this.messageModel.find(searchParams).lean();
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
