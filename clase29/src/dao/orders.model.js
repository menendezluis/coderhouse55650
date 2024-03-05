import mongoose from "mongoose";

const orderCollection = "orders";

const orderSchema = new mongoose.Schema({
  number: Number,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [],
  totalPrice: Number,
  status: String,
});

const orderModel = mongoose.model(orderCollection, orderSchema);

export default orderModel;
