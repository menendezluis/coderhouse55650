import crypto from 'crypto';
import utils from '../utils.js';

class CartManager {
  static carts;
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  addCart = async () => {
    try {
      let data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      const id = crypto.randomUUID();

      const newCart = {
        id,
        timestamp: Date.now(),
        products: [],
      };

      this.carts.push(newCart);

      await utils.writeFile(this.path, this.carts);
      return newCart;
    } catch (error) {
      console.log(error);
    }

    return newCart;
  };

  getCarts = async () => {
    try {
      let data = await utils.readFile(this.path);
      this.carts = data;
      return data?.length > 0 ? this.carts : "aun no hay registros";
    } catch (error) {
      console.log(error);
    }
  };

  getCartById = async (id) => {
    try {
      let data = await utils.readFile(this.path);
      this.carts = data?.length > 0 ? data : [];
      let cart = this.carts.find((dato) => dato.id === id);

      if (cart !== undefined) {
        return cart;
      } else {
        return "no existe el carrito solicitado";
      }
    } catch (error) {
      console.log(error);
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      const cart = await this.getCartById(cid);
      console.log(cart);
      const { products } = cart;
      const productIndex = products.findIndex(
        (product) => product.product === pid
      );

      if (productIndex !== -1) {
        products[productIndex].quantity++;
      } else {
        products.push({
          product: pid,
          quantity: 1,
        });
      }
      await this.updateCart(cart);
      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  updateCart = async (cart) => {
    const { id } = cart;
    const carts = await this.getCarts();
    const cartToUpdateIndex = carts.findIndex((carro) => carro.id === id);
    carts.splice(cartToUpdateIndex, 1, cart);
    const respuesta = await utils.writeFile(this.path, carts);
    return respuesta;
  };
}

export { CartManager };
