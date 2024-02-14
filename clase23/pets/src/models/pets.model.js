import mongoose from "mongoose";

const petCollection = "pets";

const petSchema = new mongoose.Schema({
  name: String,
  specie: String,
});

const Pet = mongoose.model(petCollection, petSchema);

export default Pet;
