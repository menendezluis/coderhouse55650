import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import config from "./config/config.js";
import UserCart from "./routes/userCart.routes.js";
import CartsRouter from "./routes/carts.routes.js";
import SessionsRouter from "./routes/sessions.routes.js";
import ProductsRouter from "./routes/products.routes.js";
import RealTimeProducts from "./routes/realTimeProducts.routes.js";
import MockingProducts from "./routes/mockingProducts.routes.js";
import {
  initializeRegisterStrategy,
  initializeGithubStrategy,
  initializeJwtStrategy,
} from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import { authToken, authorization } from "./utils/utils.js";
import { Server } from "socket.io";
import errorHandler from "./middlewares/errors/index.js";
import { addLogger } from "./utils/logger.js";

//Variables
const app = express();
const PORT = config.app.PORT;
const MONGO_URL = config.mongo.URL;

const messages = [];

// Middlewares
app.use(cors());
app.use(addLogger);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Passport
initializeRegisterStrategy();
initializeJwtStrategy();
initializeGithubStrategy();
app.use(cookieParser());
app.use(passport.initialize());

//Función asincrónica para conectar a la base de datos  y chequear si está conectada
async function enviroment() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
}

enviroment();

// Routes
app.use("/api/userCart", authToken, authorization("user", "premium"), UserCart);
app.use("/api/carts", authToken, authorization("user", "premium"), CartsRouter);
app.use("/api/sessions", SessionsRouter);
app.use(
  "/api/products",

  ProductsRouter
);
app.use(
  "/api/realTimeProducts",
  authToken,
  authorization("admin", "premium"),
  RealTimeProducts
);
app.use(
  "/api/mockingProducts",
  authToken,
  authorization("user", "premium"),
  MockingProducts
);
app.use(errorHandler);

// Server
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.on("message", (data) => {
    // Enviar una respuesta automática junto con el mensaje recibido
    const mensaje = data.message;
    const respuesta =
      "Gracias por contactarnos! En breve uno de nuestros representantes se comunicará contigo.";
    const mensajeConRespuesta = {
      mensaje: mensaje,
      respuesta: respuesta,
    };
    messages.push(mensajeConRespuesta);
    io.emit("messageLogs", messages);
  });
});
