import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    age: {
      type: Number,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Carts",
    },
    role: {
      type: String,
      enum: ["admin", "user", "premium"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
