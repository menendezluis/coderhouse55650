import { Router } from "express";
import userCart from "../controllers/userCart.controller.js";

const router = Router();

//Ruta que agrega el id del carrito al usuario
router.post("/", userCart);

export default router;
