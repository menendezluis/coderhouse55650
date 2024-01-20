import realTimeServer from './realTimeServer.js'
import app from './app.js'
import dotenv from 'dotenv'
import { PORT } from './config/index.config.js'

dotenv.config()


const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

realTimeServer(httpServer)