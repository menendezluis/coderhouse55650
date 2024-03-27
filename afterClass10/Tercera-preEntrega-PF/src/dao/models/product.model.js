import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";


const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, default: 0 },
  thumbnail: { type: String, required: true, max: 100 },
  stock: { type: Number, default: 1 },
  code: { type: String, required: true, max: 10, unique: true },
  category: { type: String, required: true, max: 20 },
});

ProductSchema.plugin(paginate);
const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;