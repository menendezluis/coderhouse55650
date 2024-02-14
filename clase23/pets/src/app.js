import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import petsRouter from "./routes/pets.routes.js";

dotenv.config();
const app = express();
const MONGO_URI = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

app.use("/api/pets", petsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});

const environment = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
  }
};

environment();
