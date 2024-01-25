import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";
import loginRouter from "./routes/login.routes.js";
import signupRouter from "./routes/signup.routes.js";
import sessionRouter from "./routes/session.routes.js";

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
const PORT = process.env.PORT || 8080;
const COOKIESECRET = process.env.CODERSECRET;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIESECRET));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//rutes

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      mongoOptions: {
        useNewUrlParser: true,
      },
      ttl: 600,
    }),
    secret: COOKIESECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", sessionRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
const environment = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (error) {
    console.log(error);
  }
};

environment();

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (error) => console.log(error));
