import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      ttl: 15,
      mongoOptions: {
        useNewUrlParser: true,
      },
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: true,
  })
);

/******** Esto corresponde  session-file --store */
/*
const fileStorage = FileStore(session);

app.use(
  session({
    store: new fileStorage({
      path: "./sessions",
      ttl: 100,
      retries: 0,
    }),
    secret: "codersecret",
    resave: true,
    saveUninitialized: true,
  })
);
*/
app.get("/", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Counter: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
  //res.send("Hello World!");
});

app.listen("3000", () => console.log("Server running on port 3000"));
