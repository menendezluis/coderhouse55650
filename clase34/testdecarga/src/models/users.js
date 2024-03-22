import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  sex: String,
  birthDate: Date,
  phone: String,
  password: String,
});

export const UserModel = mongoose.model(userCollection, userSchema);

export default UserModel;
