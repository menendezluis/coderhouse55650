import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          min: 1,
          default: 1,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

CartSchema.pre("find", function (next) {
  this.populate({
    path: "products.product",
  });
  next();
});

const CartModel = mongoose.model("Carts", CartSchema);

export default CartModel;
