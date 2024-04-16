export default class CartsRepository {
  constructor(CartModel) {
    this.cartModel = CartModel;
  }

  async createCart() {
    try {
      const products = [];
      const cart = await this.cartModel.create({ products });

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.cartModel.find();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const cart = await this.cartModel.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async addProductAndUpdate(cid, pid) {
    console.log("cid", cid);
    console.log("pid", pid);
    try {
      const productExistsInCart = await this.cartModel.exists({
        _id: cid,
        "products.product": pid,
      });
      let cart;
      if (!productExistsInCart) {
        cart = await this.cartModel.updateOne(
          { _id: cid },
          { $push: { products: { product: pid, quantity: 1 } } }
        );
      } else {
        cart = await this.cartModel.updateOne(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const productExistsInCart = await this.cartModel.exists({
        _id: cid,
        "products.product": pid,
      });
      if (!productExistsInCart) {
        throw new Error("Product not found in cart");
      }
      const cart = await this.cartModel.update(
        { _id: cid, "products.product": pid },
        { $pull: { products: { product: pid } } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteAllProducts(cid) {
    try {
      const cart = await this.cartModel.update(
        { _id: cid },
        { $set: { products: [] } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteCart(id) {
    try {
      const cart = await this.cartModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
