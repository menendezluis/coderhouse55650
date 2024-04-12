import { usersService } from "../repository/index.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateUserCartErrorInfo } from "../services/errors/info.js";

async function userCart(req, res, next) {
  const { cartId, email } = req.body;
  try {
    if (!cartId || !email) {
      const error = new CustomError({
        name: "Error de tipo de dato",
        cause: generateUserCartErrorInfo(
          [cartId, email],
          EErrors.INVALID_TYPES_ERROR
        ),
        message: "Error al cargar el carrito",
        code: EErrors.INVALID_TYPES_ERROR,
      });
      req.logger.error(error.message);
      throw error;
    }

    const user = await usersService.getOneUser(email);
    if (user.length === 0) {
      const error = new CustomError({
        name: "Error de base de datos",
        cause: generateUserCartErrorInfo(user, EErrors.DATABASE_ERROR),
        message: "Error al cargar el carrito",
        code: EErrors.DATABASE_ERROR,
      });
      req.logger.error(error.message);
      throw error;
    }

    const userId = user[0]._id;
    const cartExist = user[0].carts.find((cart) => cart == cartId);
    if (!cartExist) {
      user[0].carts.push(cartId);
      const response = await usersService.updateUserCart(userId, user[0]);
      if (!response) {
        const error = new CustomError({
          name: "Error de base de datos",
          cause: generateUserCartErrorInfo(user, EErrors.DATABASE_ERROR),
          message: "Error al actualizar el carrito",
          code: EErrors.DATABASE_ERROR,
        });
        req.logger.error(error.message);
        throw error;
      }
    } else {
      req.logger.info(
        `Carrito actualizado con éxito ${new Date().toLocaleString()}`
      );
      res.json({
        message: "Carrito actualizado con éxito",
      });
    }
  } catch (err) {
    next(err);
  }
}

export default userCart;
