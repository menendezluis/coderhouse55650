import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    age: { type: Number, require: true },
    cart:{ type: mongoose.Schema.Types.ObjectId, ref: "Cart"},
    role: { type: String, enum: ["admin", "user", "premium"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(userCollection, UserSchema);

export default User;
