import { Router } from "express";
import {
  getAll,
  getOne,
  createProduct,
} from "../controllers/products.controller.js";
import { verifyToken, authToken, authorization } from "../utils/utils.js";

//Inicializar servicios
const router = Router();

// Método asyncrono para obtener todos los productos
router.get("/", verifyToken, authorization("user", "premium"), getAll);

// Metodo asyncrono para obtener un producto por id
router.get("/:id", authorization("user", "premium"), getOne);

router.post("/", authToken, authorization("premium"), createProduct);

export default router;
