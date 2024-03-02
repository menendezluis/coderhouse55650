import express from "express";
import cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";

import viewsRouter from "./routes/views.routes.js";
import registroRouter from "./routes/registro.routes.js";
import loginRouter from "./routes/login.routes.js";
import productsRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();
const app = express();
const PORT = 8080;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";

console.log(process.env.DB_URL);
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 10000,
    }),
    secret: "codigo-s3cr3t0",
    resave: true,
    saveUninitialized: true,
  })
);

//coneccion a mongoose
mongoose.set("strictQuery", false);
mongoose.connect(DB_URL, (err) => {
  if (err) {
    console.log("No se puede conectar a la base de datos");
  } else {
    console.log("Mongoose conectado con Exito");
  }
});

app.use("/", viewsRouter);
app.use("/api/registro", registroRouter);
app.use("/api/login", loginRouter);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);
