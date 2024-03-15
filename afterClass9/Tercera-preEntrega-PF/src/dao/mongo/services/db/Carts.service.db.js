//import CartModel from "../../models/Cart.mongo.js";

export default class CartsManager {
  constructor(dao) {
    this.dao = dao;
  }
  async createCart() {
    try {
      const products = [];
      const cart = await this.dao.create({ products });

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.dao.find().lean();

      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cid) {
    try {
      const cart = await this.dao.findById(cid).lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      console.log(1, cid);
      const productExistsInCart = await this.dao.exists({
        _id: cid,
        "products.product": pid,
      });
      let cart;

      if (!productExistsInCart) {
        cart = await this.dao
          .findByIdAndUpdate(
            cid,
            { $push: { products: { product: pid, quantity: 1 } } },
            { new: true }
          )
          .lean();
        // console.log("1",cart);
        console.log(2);
      } else {
        cart = await this.dao
          .findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $inc: { "products.$.quantity": 1 } },
            { new: true }
          )
          .lean();
        // console.log("2",cart);
        console.log(3);
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(pid, cid, quantity) {
    try {
      const productExistsInCart = await this.dao.exists({
        _id: cid,
        "products.product": pid,
      });
      if (!productExistsInCart) {
        return { message: "Product not found in cart" };
      }
      const cart = await this.dao
        .findOneAndUpdate(
          { _id: cid, "products.product": pid },
          { $set: { "products.$.quantity": quantity } },
          { new: true }
        )
        .lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductFromCart(cid, pid) {
    try {
      const productExistsInCart = await this.dao.exists({
        _id: cid,
        "products.product": pid,
      });

      if (!productExistsInCart) {
        return { message: "Product not found in cart" };
      }

      const cart = await this.dao
        .findByIdAndUpdate(
          cid,
          { $pull: { products: { product: pid } } },
          { new: true }
        )
        .lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async emptyCart(cid) {
    try {
      const cart = await this.dao
        .findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true })
        .lean();

      return cart;
    } catch (error) {
      throw error;
    }
  }
}
