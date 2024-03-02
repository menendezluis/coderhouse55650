class ProductManger {
  constructor() {
    this.data = [];
  }
  async getProductById(id) {
    return this.data.find((p) => p.id === id);
  }

  async getProduct(queryList) {
    const { query, sort } = queryList;

    if (queryList) {
      if (query) {
        return this.data.filter((p) => p.category === query);
      }
      if (sort === "asc") {
        return this.data.sort((a, b) => a.price - b.price);
      }
      if (sort === "desc") {
        return this.data.sort((a, b) => b.price - a.price);
      }
    } else return this.data;
  }

  async createProduct(product) {
    product.id = Math.random().toString(36).substr(2, 9);
    this.data.push(product);
    return product;
  }

  async updateProduct(id, product) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.data.splice(index, 1, product);
  }

  async deleteProduct(id) {
    const index = this.data.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.data.splice(index, 1);
  }
}

export default { ProductManger };
