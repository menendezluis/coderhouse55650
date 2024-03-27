export default class ProductsService {
  constructor(repo) {
    this.repo = repo;
  }

  async createProduct(product) {
    try {
      const newProduct = await this.repo.create(product);

      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProducts() {
    try {
      const products = await this.repo.get();

      return products;
    } catch (error) {
      throw error;
    }
  }

  async getPaginatedProducts(filter) {
    try {
      const pagesData = await this.repo.getPaginated(filter);
      pagesData.status = "success";

      pagesData.products = pagesData.docs; // Cambio nombre de propiedad para ser más explícito
      delete pagesData.docs; // Elimino propiedad que ya no uso

      return pagesData;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(pid) {
    try {
      const product = await this.repo.get({ _id: pid });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductById(pid) {
    try {
      const product = await this.repo.delete({ _id: pid });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(pid, productUpdates) {
    try {
      const product = await this.repo.get({ _id: pid }, productUpdates);

      return product;
    } catch (error) {
      throw error;
    }
  }
}
