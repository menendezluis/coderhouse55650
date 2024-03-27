export default class CartsService {
  constructor(repo) {
    this.cartRepo = repo;
  }

  async createCart() {
    try {
      const products = [];
      const cart = await this.cartRepo.create({ products });

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      const carts = await this.cartRepo.get();
      return carts;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeerrereeeeeeeeee");
      console.log("id", id);
      const cart = await this.cartRepo.cartModel.findById(id);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const productExistsInCart = await this.cartRepo.exists({
        _id: cid,
        "products.product": pid,
      });
      let cart;
      if (!productExistsInCart) {
        cart = await this.cartRepo.update(
          { _id: cid },
          { $push: { products: { product: pid, quantity: 1 } } }
        );
      } else {
        cart = await this.cartRepo.update(
          { _id: cid, "products.product": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const productExistsInCart = await this.cartRepo.exists({
        _id: cid,
        "products.product": pid,
      });
      if (!productExistsInCart) {
        throw new Error("Product not found in cart");
      }
      const cart = await this.cartRepo.update(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async removeProductFromCart(cid, pid) {
    try {
      const productExistsInCart = await this.cartRepo.exists({
        _id: cid,
        "products.product": pid,
      });
      if (!productExistsInCart) {
        throw new Error("Product not found in cart");
      }
      const cart = await this.cartRepo.update(
        { _id: cid },
        { $pull: { products: { product: pid } } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async emptyCart(cid) {
    try {
      const cart = await this.cartRepo.update(
        { _id: cid },
        { $set: { products: [] } }
      );
      return cart;
    } catch (error) {
      throw error;
    }
  }
}
