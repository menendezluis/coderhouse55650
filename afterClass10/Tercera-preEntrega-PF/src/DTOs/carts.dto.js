import ProductDTO from "./ProductDTO";

export default class CartDTO {
  constructor(cart) {
    this.userId = cart.userId;
    this.products = cart.products.map((product) => new ProductDTO(product));
    this.totalPrice = this.calculateTotalPrice(cart.products);
  }

  calculateTotalPrice(products) {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  }
}
