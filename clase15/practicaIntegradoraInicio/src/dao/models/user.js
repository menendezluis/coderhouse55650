import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, required: true, unique: true },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  courses: {
    type: Array,
    default: [],
  },
});

export const UserModel = mongoose.model(userCollection, UserSchema);
