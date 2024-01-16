import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    index: true,
  },
  last_name: String,
  email: { type: String, required: true, unique: true },
  gender: String,
});

export const UserModel = mongoose.model(userCollection, UserSchema);
