
export default class ChatService {
  constructor(repo) {
    this.repo= repo;
  }

  async createMessage(message) {
    try {
      const newMessage = await this.repo.create(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(message) {
    try {
      const newMessage = await this.repo.get(message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }
}
