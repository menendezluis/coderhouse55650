import { Router } from "express";
import CustomError from "../services/CustomError.js";
import EErrors from "../services/enum.js";
import {
  generateUserErrorInfo,
  generateMiercolesErrorInfo,
} from "../services/info.js";

const user = [];
const router = Router();

router.get("/", (req, res) => {
  res.json({
    count: user.length,
    data: user,
  });
});

router.post("/", (req, res, next) => {
  const { first_name, last_name, email, day } = req.body;
  if (!first_name || !last_name || !email) {
    CustomError.createError({
      name: "Error creando usuario",
      cause: generateUserErrorInfo(req.body),
      message: "Uno o más campos son inválidos",
      code: EErrors.INVALID_TYPES_ERROR,
    });
  }
  const temporalUser = {
    first_name,
    last_name,
    email,
    age: req.body.age || 0,
  };

  if (day === "miercoles") {
    CustomError.createError({
      name: "Error creando usuario",
      cause: generateMiercolesErrorInfo(req.body),
      message: "No se pueden crear usuarios los miércoles",
      code: EErrors.ERROR_DE_MIERCOLES,
    });
  }

  user.push(temporalUser);

  res.json({
    message: "Usuario creado con éxito",
    data: temporalUser,
  });
});

export default router;
