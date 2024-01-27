import { Server } from 'socket.io'
import ChatDao from './DAOs/mongodb/chat.dao.js'

const Chat = new ChatDao()

const realTimeServer = (httpServer) => {
    const io = new Server(httpServer)
    
    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`)

        socket.on('message', async data => {
            try {
                await Chat.create(data)
                const message = await Chat.getAll()

                io.emit('messagelogs', message)
            }catch (error) {
                console.log(error)
            }
            
        })

        socket.on('authenticated', async data => {
            try {
                const messages = await Chat.getAll()
                socket.emit('messagelogs', messages)
                socket.broadcast.emit('newUser', data)
            }
            catch (error) {
                console.log(error)
            }
        })
    })
}

export default realTimeServer
