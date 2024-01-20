import { messagesModel } from './models/messages.models.js'


class ChatDao {
    async getAll() {
        try {
            const result = await messagesModel.find()
            return result
        } catch (error) {
            throw error
        }
    }

    async create(newMessage) {
        try {
            const result = await messagesModel.create(newMessage)
            return result
        } catch (error) {
            throw error
        }
    }
}

export default ChatDao