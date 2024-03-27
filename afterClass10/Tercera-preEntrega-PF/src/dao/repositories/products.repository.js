export default class ProductsRepository {
  constructor(ProductModel) {
    this.productModel = ProductModel;
  }

  async createProduct(product) {
    try {
      const newProduct = await this.productModel.create(product);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(data) {
    try {
      return await this.productModel.get(data);
    } catch (error) {
      throw error;
    }
  }

  async getProduct(product) {
    try {
      return await this.productModel.getBy(product);
    } catch (error) {
      throw error;
    }
  }

  async getPaginated(filter) {
    try {
      filter.options.lean = true;
      const pagesData = await this.productModel.paginate(
        filter.query,
        filter.options
      );

      return pagesData;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(pid) {
    try {
      return await this.productModel.findOneAndDelete(pid);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, update, options = { new: true, lean: true }) {
    try {
      return await this.productModel.findOneAndUpdate(id, update, options);
    } catch (error) {
      throw error;
    }
  }
}
