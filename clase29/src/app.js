import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRouter from "./routes/orders.routes.js";
import businessRouter from "./routes/business.routes.js";
import userRouter from "./routes/users.routes.js";

dotenv.config();

const app = express();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/clase29";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/orders", orderRouter);
app.use("/business", businessRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });
