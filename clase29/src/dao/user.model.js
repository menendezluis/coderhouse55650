import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    },
  ],
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
