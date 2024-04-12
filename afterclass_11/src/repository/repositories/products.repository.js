export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  // Método asyncrono para obtener todos los productos
  getAllProducts = async () => {
    const result = await this.dao.getAll();
    return result;
  };

  // Método asyncrono para obtener un producto
  getOneProduct = async (id) => {
    const result = await this.dao.getOne(id);
    return result;
  };

  // Método asyncrono para crear un producto
  saveOneProduct = async (product) => {
    const result = await this.dao.saveProduct(product);
    return result;
  };

  // Método asyncrono para actualizar un producto
  updateOneProduct = async (id, product) => {
    const result = await this.dao.updateProduct(id, product);
    return result;
  };

  //Método asyncrono para obtener los productos filtrados por categoría
  filteredAllProducts = async (category) => {
    const result = await this.dao.filteredProducts(category);
    return result;
  };

  //Método asyncrono para obtener los productos ordenados
  orderedAllProducts = async (order) => {
    const result = await this.dao.orderedProducts(order);
    return result;
  };

  //Método asyncrono para obtener los productos paginados
  paginatedAllProducts = async (page) => {
    const result = await this.dao.paginatedProducts(page);
    return result;
  };

  // Método asyncrono para eliminar un producto
  deleteOneProduct = async (id) => {
    const result = await this.dao.deleteProduct(id);
    return result;
  };
}
