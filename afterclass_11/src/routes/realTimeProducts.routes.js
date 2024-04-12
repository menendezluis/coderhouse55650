import { Router } from "express";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controllers/realTimeProducts.controller.js";

//Inicializar servicios
const router = Router();

// Ruta que obtine todos los productos
router.get("/", getProducts);

//Ruta para obtener un producto
router.get("/:id", getProduct);

//Ruta para guardar un producto
router.post("/", saveProduct);

//Ruta para eliminar un producto
router.delete("/:id", deleteProduct);

//Ruta para actualizar un producto
router.put("/:id", updateProduct);

export default router;
