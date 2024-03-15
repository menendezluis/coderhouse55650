import productModel from "./product.schema.js";

export default class Products {
  constructor() {}

  get = async () => {
    return await productModel.find();
  };

  create = async () => {
    const newProduct = new productModel(product);
    await newProduct.save();
    return newProduct;
  };

  modify = async (id, product) => {
    return await productModel.finByIdAndUpdate(id, product, { new: true });
  };

  delete = async (id) => {
    return await productModel.findByIdAndDelete(id);
  };
}
