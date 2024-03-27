export default class ProductDTO {
  constructor(product) {
    this.productId = product.productId;
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
  }
}
