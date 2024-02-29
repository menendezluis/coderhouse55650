import express from "express";
import contactRouter from "./router/contact.router.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/clase28";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/contacts", contactRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
