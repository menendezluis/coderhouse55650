import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import toysRouter from "./routes/toys.js";
import userRouter from "./routes/users.js";

dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/toyshop";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/toys", toysRouter);
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

mongoose.connect(DB_URL);
