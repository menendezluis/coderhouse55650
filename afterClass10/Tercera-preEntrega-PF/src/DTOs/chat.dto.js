export default class ChatDTO {
  constructor(message) {
    this.senderId = message.senderId;
    this.receiverId = message.receiverId;
    this.message = message.message;
    this.timestamp = new Date(); 
  }
}
