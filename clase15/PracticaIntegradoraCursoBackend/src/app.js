import express from 'express';
import __dirname from './utils.js';
import usersRouter from './routes/users.router.js';
import coursesRouter from './routes/courses.router.js';
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
const app = express();
const PORT = 8080;
const connection = mongoose.connect('TU URL DE MONGO AQUÍ')
/**
 * Template engine
 */
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

/**
 * Middlewares
 */
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',viewsRouter)
app.use('/api/users',usersRouter);
app.use('/api/courses',coursesRouter);

const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`));
