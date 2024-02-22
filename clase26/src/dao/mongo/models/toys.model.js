import mongoose from "mongoose";

const toysCollection = "toys";

const toySchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
});

const toysModel = mongoose.model(toysCollection, toySchema);

export default toysModel;
