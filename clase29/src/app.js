import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import orderRouter from "./routes/orders.routes.js";
import businessRouter from "./routes/business.routes.js";
import userRouter from "./routes/users.routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://localhost:3000",
      "http://127.0.0.1:5500",
    ],
  })
);
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/clase29";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/orders", orderRouter);
app.use("/api/business", businessRouter);
app.use("/api/users", userRouter);

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
