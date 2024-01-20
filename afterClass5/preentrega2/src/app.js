import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import router from './routes/index.js'
import connectMongo from './db/index.js'

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Configuración de motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

connectMongo()
router(app)

export default app