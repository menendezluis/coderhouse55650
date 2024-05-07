import express from "express";
import __dirname from "./utils.js";

import usersRouter from "./routes/users.router.js";
import coursesRouter from "./routes/courses.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";

import handlebars from "express-handlebars";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
//logger
import { addLogger } from "./middleware/logger.middleware.js";
//documentacion
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
const PORT = 8080;
const connection = mongoose.connect(config.mongo.URL);
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion Adoptme API - Practica integrador",
      version: "1.0.0",
      description: "API creada en la clase de swagger",
      contact: {
        name: "Coderhouse",
      },
      servers: ["http://localhost:8080"],
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJsdoc(swaggerOptions);

/**
 * Template engine
 */
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/**
 * Middlewares
 */
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());
app.use(addLogger);

app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
