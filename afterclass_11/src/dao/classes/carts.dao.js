import cartsModel from "../models/carts.model.js";

export default class CartsDao {
  // Método asyncrono para obtener todos los carritos
  getAll = async () => {
    try {
      const result = await cartsModel.find().lean();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para obtener un carrito
  getOne = async (id) => {
    try {
      const result = await cartsModel.findById(id).lean();
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para crear un carrito
  saveCart = async (cart) => {
    try {
      const result = await cartsModel.create(cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para eliminar un producto del carrito
  updateCart = async (id, cart) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para vaciar el carrito
  emptyCart = async (id, cart) => {
    try {
      const result = await cartsModel.updateOne({ _id: id }, cart);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para popular el carrito
  populatedCart = async (id) => {
    try {
      const result = await cartsModel.findById(id).populate("products.product");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
