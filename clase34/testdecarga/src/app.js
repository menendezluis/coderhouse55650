import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRoute from "./routes/users.js";

dotenv.config();
const app = express();
const PORT = 8080;

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/ecommerce";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", useRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error en conexión a base de datos", error);
  });
