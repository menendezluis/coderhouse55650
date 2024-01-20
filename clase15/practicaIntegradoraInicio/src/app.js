import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import viewsRouter from "./routes/views.route.js";
import { __dirname } from "./utils.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//////////////////////
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
//////////////////////

app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/", viewsRouter);

const server = app.listen(PORT, () => {
  console.log("Servidor iniciado" + PORT);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error en conexión a base de datos", error);
  });

const data = {
  meta: {
    arg: { deviceId: "123", ipAddress: "321", phoneNumber: "+17722491117" },
    requestId: "MsLleEwC0GUMBx83jffcp",
    requestStatus: "fulfilled",
  },
  payload: "LNNFQRTLNZZWWLBDMIUDGPCJEVKHIQZ7",
  type: "app/loginWithPhone/fulfilled",
};
