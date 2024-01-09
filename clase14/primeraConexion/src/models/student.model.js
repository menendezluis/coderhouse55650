import mongoose from "mongoose";

const userCollection = "student";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  email: { type: String, required: true, unique: true },
});

export const StudentModel = mongoose.model(userCollection, UserSchema);
