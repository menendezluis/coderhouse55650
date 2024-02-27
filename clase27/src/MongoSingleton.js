import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/clase27";
export default class MongoSingleton {
  static #instance;

  constructor() {
    mongoose.connect(DB_URL);
  }
  static getInstance() {
    if (this.#instance) {
      console.log("La instancia ya existe");
      return this.#instance;
    }
    console.log("La instancia no existe");
    this.#instance = new MongoSingleton();
    return this.#instance;
  }
}
