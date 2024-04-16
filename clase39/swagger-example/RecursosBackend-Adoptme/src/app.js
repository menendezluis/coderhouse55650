import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import { __dirname } from "./utils.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/adoptme";
const connection = mongoose.connect(MONGO_URL);

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion Adoptme API - 55650",
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
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
