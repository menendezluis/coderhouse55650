import mongoose from "mongoose";

const orderCollection = "orders";

const OrderSchema = new mongoose.Schema({
  name: String,
  size: {
    type: String,
    enum: ["small", "medium", "large", "xlarge"],
    default: "medium",
  },
  price: Number,
  quantity: Number,
  date: Date,
});

export const OrderModel = mongoose.model(orderCollection, OrderSchema);
