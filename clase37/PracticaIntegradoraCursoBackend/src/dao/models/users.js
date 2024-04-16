import mongoose from "mongoose";

const userCollection = "Users";

const usersSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dni: Number,
  birthDate: Date,
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  role: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
  courses: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Courses",
      },
    ],
    default: [],
  },
});
//660b5c3ec3f8e3448b9ca56d

export const userModel = mongoose.model(userCollection, usersSchema);
