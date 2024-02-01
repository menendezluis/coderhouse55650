import express from "express";
import passport from "passport";
import session from "express-session";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";
import initializePassport from "./config/passport.config.js";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const COOKIESECRET = process.env.CODERSECRET;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const connection = () =>
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((error) => {
      console.log(`Error al conectar a la base de datos: ${error}`);
    });

connection();

server.on("error", (error) => console.log(`Error en el servidor: ${error}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

initializePassport();
app.use(
  session({
    secret: COOKIESECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());

app.use("/", viewsRouter);
app.use("/api/sessions", sessionRouter);
