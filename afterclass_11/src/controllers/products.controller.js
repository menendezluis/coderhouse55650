import { productsService } from "../repository/index.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateProductErrorInfo } from "../services/errors/info.js";

async function getAll(req, res, next) {
  const { page, sort, category } = req.query;

  try {
    let products;

    if (category) {
      products = await productsService.filteredAllProducts(category);
      const message = `Productos filtrados con éxito ${new Date().toLocaleString()}`;
      const errorMessage = `Error de base de datos: Error al obtener los productos filtrados ${new Date().toLocaleString()}`;
      const error = generateError(products, message, errorMessage);
      res.json({ message, products: products.docs });
    } else if (sort) {
      products = await productsService.orderedAllProducts(sort);
      const message = `Productos ordenados con éxito ${new Date().toLocaleString()}`;
      const errorMessage = `Error de base de datos: Error al obtener los productos ordenados ${new Date().toLocaleString()}`;
      const error = generateError(products, message, errorMessage);
      res.json({ message, products });
    } else {
      products = await productsService.paginatedAllProducts(page);
      const message = `Productos paginados con éxito ${new Date().toLocaleString()}`;
      const errorMessage = `Error de base de datos: Error al obtener los productos paginados ${new Date().toLocaleString()}`;
      const error = generateError(products, message, errorMessage);
      res.json({ message, products: products.docs });
    }
  } catch (err) {
    next(err);
  }
}

// Funcion para obtener un producto por id
async function getOne(req, res, next) {
  const { id } = req.params;
  try {
    const product = await productsService.getOneProduct(id);
    const message = `Producto obtenido con éxito ${new Date().toLocaleString()}`;
    const errorMessage = `Error de base de datos: Error al obtener el producto ${new Date().toLocaleString()}`;
    const error = generateError(product, message, errorMessage);
    res.json({ message, product });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  const { title, description, code, price, stock, category, owner, thumbnail } =
    req.body;
  try {
    const product = await productsService.saveOneProduct({
      title,
      description,
      code,
      price,
      stock,
      category,
      owner,
      thumbnail,
    });
    const message = `Producto creado con éxito ${new Date().toLocaleString()}`;
    const errorMessage = `Error de base de datos: Error al crear el producto ${new Date().toLocaleString()}`;
    const error = generateError(product, message, errorMessage);
    res.json({ message, product });
  } catch (err) {
    next(err);
  }
}
// Funcion para generar errores
function generateError(products, message, errorMessage) {
  if (products.length === 0) {
    req.logger.error(errorMessage);
    return CustomError.createError({
      name: "Error de base de datos",
      cause: generateProductErrorInfo(products, EErrors.DATABASE_ERROR),
      message,
      code: EErrors.DATABASE_ERROR,
    });
  }
}

export { getAll, getOne, createProduct };
