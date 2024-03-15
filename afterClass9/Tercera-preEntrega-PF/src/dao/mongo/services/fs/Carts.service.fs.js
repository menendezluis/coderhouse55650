import crypto from "crypto";
import fs from "fs";
import ProductsManager from "./Products.service.fs.js";

const productsManager = new ProductsManager();

export default class CartsManager {
  #cartsFilePath;

  constructor(filePath = "./src/carts.json") {
    this.#cartsFilePath = filePath;
  }

  async createCart() {
    try {
      const newCart = {
        id: crypto.randomUUID(),
        products: [],
      };

      const carts = await this.getCarts();

      carts.push(newCart);

      this.#saveCarts(carts);
    } catch (error) {
      throw error;
    }
  }

  async getCarts() {
    try {
      if (fs.existsSync(this.#cartsFilePath)) {
        const carts = JSON.parse(await fs.promises.readFile(this.#cartsFilePath, "utf-8"));
        return carts;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((cart) => cart.id == id);

      if (!cart) {
        throw new Error(`Cart with id ${id} was not found.`);
      }

      cart.products = await Promise.all(
        cart.products.map(async (productData) => {
          return {
            product: await productsManager.getProductById(productData.product),
            quantity: productData.quantity,
          };
        })
      );

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getCarts();

      const cart = carts.find((cart) => cart.id == cid);
      if (!cart) {
        throw new Error(`Cart with id ${id} was not found.`);
      }

      const productInCart = cart.products.find((productData) => productData.product == pid);
      if (productInCart) {
        productInCart.quantity++;
      } else {
        cart.products.push({
          product: pid,
          quantity: 1,
        });
      }

      await this.#saveCarts(carts);

      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async #saveCarts(carts) {
    try {
      await fs.promises.writeFile(this.#cartsFilePath, JSON.stringify(carts));
    } catch (error) {
      throw error;
    }
  }
}
