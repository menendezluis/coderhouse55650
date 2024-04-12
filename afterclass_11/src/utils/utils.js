import passport from "passport";
import bcrypt from "bcrypt";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { faker, ne } from "@faker-js/faker";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateAuthErrorInfo } from "../services/errors/info.js";

//Cargar variables de entorno
const JWT_SECRET = config.jwt.SECRET;

// Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validar contraseña
export const isValidPassword = (savedPassword, password) => {
  return bcrypt.compareSync(password, savedPassword);
};

// Generar JWT token
const generateToken = (user) => {
  const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Verificar si token es valido para actualizar contraseña
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      req.logger.error(
        `Error de autenticación. El token no pudo ser verificado ${new Date().toLocaleString()}`
      );
      CustomError.createError({
        name: "Error de autenticación",
        cause: generateAuthErrorInfo(token, EErrors.AUTH_ERROR),
        message: "El token no pudo ser verificado",
        code: EErrors.AUTH_ERROR,
      });
    } else {
      req.user = user;
      next();
    }
  });
};

// Verificar JWT token
const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.logger.error(
      `Authentication error. Failed to authenticate user ${new Date().toLocaleString()}`
    );
    CustomError.createError({
      name: "Authentication error",
      cause: generateAuthErrorInfo(authHeader, EErrors.AUTH_ERROR),
      message: "Failed to authenticate user",
      code: EErrors.AUTH_ERROR,
    });
    return next(new Error("Authentication error"));
  } else {
    const token = authHeader.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, "JWT_SECRET");
    console.log("verify", verify);
    jwt.verify(token, "JWT_SECRET", (err, user) => {
      if (err) {
        console.log("tenemos un error,", err);
        req.logger.error(
          `Authentication error. Failed to verify token ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Authentication error",
          cause: generateAuthErrorInfo(token, EErrors.AUTH_ERROR),
          message: "Failed to verify token",
          code: EErrors.AUTH_ERROR,
        });
        return next(new Error("Authentication error"));
      } else {
        req.user = user;
        next();
      }
    });
  }
};

// Autenticar usuario con passport
const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) {
        req.logger.error(
          `Authentication error. User not authorized ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Authentication error",
          cause: generateAuthErrorInfo(error, EErrors.AUTH_ERROR),
          message: "User not authorized",
          code: EErrors.AUTH_ERROR,
        });
        return next(error);
      }
      if (!user) {
        req.logger.error(
          `Authentication error. User not authenticated ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Authentication error",
          cause: generateAuthErrorInfo(user, EErrors.AUTH_ERROR),
          message: "User not authenticated",
          code: EErrors.AUTH_ERROR,
        });
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      } else {
        req.user = user;
      }
      next();
    })(req, res, next);
  };
};

// Controlar autorizacion de usuario
const authorization = (...roles) => {
  return async (req, res, next) => {
    console.log(roles);
    const userRole = req.user.role;
    try {
      if (!userRole) {
        req.logger.error(
          `Error de autenticación: Usuario no autorizado. ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de autenticación",
          cause: generateAuthErrorInfo(req.user, EErrors.AUTH_ERROR),
          message: "Usuario no autorizado",
          code: EErrors.AUTH_ERROR,
        });
        return res.status(401).send({ error: "Usuario no autorizado" });
      }
      if (!roles.includes(userRole)) {
        req.logger.error(
          `Error de autenticación. Usuario sin permisos ${new Date().toLocaleString()}`
        );
        CustomError.createError({
          name: "Error de autenticación",
          cause: generateAuthErrorInfo(req.user, EErrors.AUTH_ERROR),
          message: "Usuario sin permisos",
          code: EErrors.AUTH_ERROR,
        });
        return res.status(403).send({ error: "Usuario sin permisos" });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Generar productos falsos
function generateProducts() {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.commerce.product(),
    price: faker.commerce.price(),
    stock: faker.number.int(20),
    category: faker.commerce.department(),
    image: faker.image.url(),
  };
}

export {
  generateToken,
  passportCall,
  authorization,
  authToken,
  verifyToken,
  generateProducts,
};
