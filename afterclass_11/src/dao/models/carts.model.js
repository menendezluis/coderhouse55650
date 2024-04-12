import mongoose from "mongoose";

const cartstsCollection = "carts";

const cartsSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

//Middleware para popular el carrito
cartsSchema.pre("find", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model(cartstsCollection, cartsSchema);

export default cartsModel;
