import mongoose from "mongoose";

const usersCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
});

const usersModel = mongoose.model(usersCollection, userSchema);

export default usersModel;
