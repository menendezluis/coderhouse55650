import { cartService } from "../repository/index.js";
import { productsService } from "../repository/index.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import {
  generateCartErrorInfo,
  generateAuthErrorInfo,
} from "../services/errors/info.js";

// Método asyncrono para obtener todos los carritos
async function getAll(req, res, next) {
  try {
    const carts = await cartService.getAllCarts();
    if (carts.length === 0) {
      req.logger.error(
        `Error de base de datos: Error al cargar los carritos ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(carts, EErrors.DATABASE_ERROR),
        message: "Error al cargar los carritos",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      req.logger.info(
        `Carritos cargados con exito ${new Date().toLocaleString()}`
      );
      res.json({ message: "Carritos cargados con exito", data: carts });
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para obtener un carrito
async function getOne(req, res, next) {
  const { cid } = req.params;
  try {
    if (!cid) {
      req.logger.error(
        `Error de tipo de dato: Error al obtener el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(cid, EErrors.INVALID_TYPES_ERROR),
        message: "Error al obtener el carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const cart = await cartService.getOneCart(cid);
    if (cart.length === 0) {
      req.logger.error(
        `Error de base de datos: Error al obtener el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Error al obtener el carrito",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      req.logger.info(
        `Carrito obtenido con éxito ${new Date().toLocaleString()}`
      );
      res.json({ message: "Carrito obtenido con éxito", data: cart });
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para popular el carrito
async function populatedCart(req, res, next) {
  const { cid } = req.params;
  try {
    if (!cid) {
      req.logger.error(
        `Error de tipo de dato: Error al popular el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(cid, EErrors.INVALID_TYPES_ERROR),
        message: "Error al popular el carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const cart = await cartService.populatedOneCart(cid);
    if (!cart) {
      req.logger.error(
        `Error de base de datos: Error al popular el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Error al popular el carrito",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      req.logger.info(
        `Carrito populado con éxito ${new Date().toLocaleString()}`
      );
      res.json({ message: "Carrito populado con éxito", data: cart });
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para crear un carrito
async function createCart(req, res, next) {
  const newCart = req.body;
  try {
    if (!newCart) {
      req.logger.error(
        `Error de tipo de dato: Error al crear el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(newCart, EErrors.INVALID_TYPES_ERROR),
        message: "Error al crear el carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const result = await cartService.saveOneCart(newCart);
    if (!result.products) {
      req.logger.error(
        `Error de base de datos: Error al crear el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(newCart, EErrors.DATABASE_ERROR),
        message: "Error al crear el carrito",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      req.logger.info(
        `Carrito populado creado con éxito ${new Date().toLocaleString()}`
      );
      res.json({ message: "Carrito creado con éxito", data: newCart });
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para agregar productos al carrito
async function manageCartProducts(req, res, next) {
  const { cid, pid } = req.params;
  const { op } = req.body;

  try {
    if (!cid || !pid || !op) {
      req.logger.error(
        `Error de tipo de dato: Error al agregar productos al carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(cid, EErrors.INVALID_TYPES_ERROR),
        message: "Error al agregar productos al carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    const cart = await cartService.getOneCart(cid);
    if (!cart.products) {
      req.logger.error(
        `Error de base de datos: Error al obtener el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Error al obtener el carrito",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      const product = await productsService.getOneProduct(pid);
      console.log(product.owner);

      if (product.owner === req.user.user.username) {
        req.logger.error(
          `Error de autenticación: El propietario no puede agregar su producto al carrito ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de autenticación",
          cause: generateAuthErrorInfo(cart, EErrors.AUTH_ERROR),
          message: "El propietario no puede agregar su producto al carrito",
          code: EErrors.AUTH_ERROR,
        });
        res.json({
          status: "error",
          message: "El propietario no puede agregar su producto al carrito",
        });
      } else {
        const productExist = cart.products.findIndex(
          (product) => product.product == pid
        );
        if (productExist === -1) {
          cart.products.push({ product: pid, quantity: 1 });
        } else {
          if (op === "add") {
            cart.products[productExist].quantity += 1;
          } else if (op === "substract") {
            cart.products[productExist].quantity -= 1;
          }
        }
        const result = await cartService.updateOneCart(cid, cart);
        if (!result) {
          CustomError.createError({
            name: "Error de base de datos",
            cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
            message: "Error al actualizar el carrito",
            code: EErrors.DATABASE_ERROR,
          });
        } else {
          req.logger.info(
            `Carrito populado con éxito ${new Date().toLocaleString()}`
          );
          res.json({ message: "Carrito actualizado con éxito", data: cart });
        }
      }
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para eliminar productos del carrito
async function deleteProduct(req, res, next) {
  const { cid, pid } = req.params;
  try {
    if (!cid || !pid) {
      req.logger.error(
        `Error de tipo de dato: Error al eliminar el producto ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(cid, EErrors.INVALID_TYPES_ERROR),
        message: "Error al eliminar el producto",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const cart = await cartService.getOneCart(cid);
    if (!cart) {
      req.logger.error(
        `Error de base de datos: Error al eleiminar el producto ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Error al eliminar el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }

    let productExistsInCarts = cart.products.findIndex(
      (dato) => dato.product == pid
    );

    cart.products.splice(productExistsInCarts, 1);

    const result = await cartService.updateOneCart(cid, cart);
    if (!result) {
      req.logger.error(
        `Error de base de datos: Error al actualizar el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Error al actualizar el carrito",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      req.logger.info(
        `Carrito populado con éxito ${new Date().toLocaleString()}`
      );
      res.json({ message: "Producto eliminado con éxito", data: cart });
    }
  } catch (err) {
    next(err);
  }
}

// Método asyncrono para vaciar el carrito
async function emptyCart(req, res, next) {
  const { cid } = req.params;
  try {
    if (!cid) {
      req.logger.error(
        `Error de tipo de dato: Error al vaciar el carrito ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de tipo de dato",
        cause: generateCartErrorInfo(cid, EErrors.INVALID_TYPES_ERROR),
        message: "Error al vaciar el carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const cart = await cartService.getOneCart(cid);
    if (cart.length === 0) {
      req.logger.error(
        `Error de base de datos: Carrito no encontrado  ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de base de datos",
        cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
        message: "Carrito no encontrado",
        code: EErrors.DATABASE_ERROR,
      });
    } else {
      cart.products = [];
      const result = await cartService.updateOneCart(cid, cart);
      if (!result) {
        req.logger.error(
          `Error de base de datos: Error al vaciar el carrito ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de base de datos",
          cause: generateCartErrorInfo(cart, EErrors.DATABASE_ERROR),
          message: "Error al vaciar el carrito",
          code: EErrors.DATABASE_ERROR,
        });
      } else {
        req.logger.info(
          `Carrito populado con éxito ${new Date().toLocaleString()}`
        );
        res.json({ message: "Carrito vaciado con éxito", data: cart });
      }
    }
  } catch (err) {
    next(err);
  }
}

export {
  getAll,
  getOne,
  createCart,
  manageCartProducts,
  deleteProduct,
  emptyCart,
  populatedCart,
};
