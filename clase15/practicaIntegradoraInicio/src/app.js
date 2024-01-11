import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import viewsRouter from "./routes/views.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
