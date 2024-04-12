import { productsService } from "../repository/index.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import {
  generateProductErrorInfo,
  generateAuthErrorInfo,
} from "../services/errors/info.js";

// Metodo asincrono para obtener todos los productos
async function getProducts(req, res, next) {
  try {
    const products = await productsService.getAllProducts();

    if (products.length === 0) {
      const errorMessage = `Error de base de datos: Error al obtener los productos ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateProductErrorInfo(products, EErrors.DATABASE_ERROR),
        message: "Error al obtener los productos",
        code: EErrors.DATABASE_ERROR,
      });
    }

    const message = `Productos obtenidos con éxito ${new Date().toLocaleString()}`;
    req.logger.info(message);
    res.json({ message, data: products });
  } catch (err) {
    next(err);
  }
}

// Metodo asincrono para obtener un producto
async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    if (!id) {
      const errorMessage = `Error de tipo de dato: Error al obtener el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateProductErrorInfo(id, EErrors.INVALID_TYPES_ERROR),
        message: "Error al obtener el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = await productsService.getOneProduct(id);

    if (!product) {
      const errorMessage = `Error de base de datos: Error al obtener el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateProductErrorInfo(product, EErrors.DATABASE_ERROR),
        message: "Error al obtener el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }

    const message = `Producto obtenido con éxito ${new Date().toLocaleString()}`;
    req.logger.info(message);
    res.json({ message, data: product });
  } catch (err) {
    next(err);
  }
}

// Metodo asincrono para guardar un producto
async function saveProduct(req, res, next) {
  const { title, description, code, price, stock, category, owner, thumbnail } =
    req.body;

  try {
    if (!title || !description || !price || !code || !stock || !category) {
      const data = { title, description, code, price, stock, category };
      const errorMessage = `Error de tipo de dato: Error al crear el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de tipo de datos",
        cause: generateProductErrorInfo(data, EErrors.INVALID_TYPES_ERROR),
        message: "Error al crear el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      stock,
      owner,
      category,
      thumbnail,
    };

    const result = await productsService.saveOneProduct(product);

    if (!result) {
      const errorMessage = `Error de base de datos: Error al crear el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateProductErrorInfo(result, EErrors.DATABASE_ERROR),
        message: "Error al crear el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }

    const message = `Producto creado con éxito ${new Date().toLocaleString()}`;
    req.logger.info(message);
    res.json({ message, data: product });
  } catch (err) {
    next(err);
  }
}

// Metodo asincrono para eliminar un producto
async function deleteProduct(req, res, next) {
  const { id } = req.params;
  const userRole = req.user.role;

  try {
    if (!id) {
      const errorMessage = `Error de tipo de dato: Error al eliminar el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateProductErrorInfo(id, EErrors.INVALID_TYPES_ERROR),
        message: "Error al eliminar el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = await productsService.getOneProduct(id);

    if (userRole === "premium" && product.owner !== req.user.user.username) {
      const errorMessage = `Error de permisos: Error al eliminar el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de permisos",
        cause: generateAuthErrorInfo(userRole, EErrors.AUTH_ERROR),
        message: "Error al eliminar el producto",
        code: EErrors.AUTH_ERROR,
      });
    } else {
      const result = await productsService.deleteOneProduct(id);
      req.logger.info(
        `Producto eliminado con éxito ${new Date().toLocaleString()}`
      );
      res.json({ message: `Producto eliminado con éxito`, data: result });
    }

    if (!result) {
      const errorMessage = `Error de base de datos: Error al eliminar el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateProductErrorInfo(result, EErrors.DATABASE_ERROR),
        message: "Error al eliminar el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }

    const message = `Producto eliminado con éxito ${new Date().toLocaleString()}`;
    req.logger.info(message);
    res.json({ message, data: result });
  } catch (err) {
    next(err);
  }
}

// Metodo asincrono para actualizar un producto
async function updateProduct(req, res, next) {
  const { id } = req.params;
  const { title, description, code, price, stock, category, thumbnail } =
    req.body;

  try {
    if (!title || !description || !price || !code || !stock) {
      const data = { title, description, code, price, stock, category };
      const errorMessage = `Error de tipo de dato: Error al actualizar el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de tipo de datos",
        cause: generateProductErrorInfo(data, EErrors.INVALID_TYPES_ERROR),
        message: "Error al actualizar el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnail,
    };

    const result = await productsService.updateOneProduct(id, product);

    if (!result) {
      const errorMessage = `Error de base de datos: Error al actualizar el producto ${new Date().toLocaleString()}`;
      req.logger.error(errorMessage);
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateProductErrorInfo(result, EErrors.DATABASE_ERROR),
        message: "Error al actualizar el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }

    const message = `Producto actualizado con éxito ${new Date().toLocaleString()}`;
    req.logger.info(message);
    res.json({ message, data: product });
  } catch (err) {
    next(err);
  }
}

export { getProducts, getProduct, saveProduct, deleteProduct, updateProduct };
