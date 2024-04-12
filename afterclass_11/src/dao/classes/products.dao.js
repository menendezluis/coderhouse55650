import productsModel from "../models/products.model.js";

export default class ProductsDao {
  //Método asyncrono para obtener todos los productos
  getAll = async () => {
    try {
      const products = await productsModel.find().lean();
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener un producto
  getOne = async (id) => {
    try {
      const product = await productsModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para crear un producto
  saveProduct = async (product) => {
    try {
      const result = await productsModel.create(product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para actualizar un producto
  updateProduct = async (id, product) => {
    try {
      const result = await productsModel.findByIdAndUpdate(id, product);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos filtrados por categoría
  filteredProducts = async (category) => {
    try {
      const products = await productsModel.paginate(
        { category: category },
        { limit: 10, page: 1 }
      );
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos ordenados por precio
  orderedProducts = async (order) => {
    try {
      const products = await productsModel.aggregate([
        { $sort: { price: parseInt(order) } },
      ]);
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener los productos paginados
  paginatedProducts = async (page) => {
    try {
      const products = await productsModel.paginate(
        {},
        { limit: 10, page: parseInt(page) }
      );
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para eliminar un producto
  deleteProduct = async (id) => {
    try {
      const result = await productsModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
