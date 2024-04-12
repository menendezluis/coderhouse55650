export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para obtener todos los carritos
  getAllCarts = async () => {
    const result = await this.dao.getAll();
    return result;
  };

  // Método asyncrono para obtener un carrito
  getOneCart = async (id) => {
    const result = await this.dao.getOne(id);
    return result;
  };

  // Método asyncrono para crear un carrito
  saveOneCart = async (cart) => {
    const result = await this.dao.saveCart(cart);
    return result;
  };

  // Método asyncrono para eliminar un producto del carrito
  updateOneCart = async (id, cart) => {
    const result = await this.dao.updateCart(id, cart);
    return result;
  };

  // Método asyncrono para vaciar el carrito
  emptyOneCart = async (id, cart) => {
    const result = await this.dao.emptyCart(id, cart);
    return result;
  };

  // Método asyncrono para popular el carrito
  populatedOneCart = async (id) => {
    const result = await this.dao.populatedCart(id);
    return result;
  };
}
