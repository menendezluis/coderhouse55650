import { Router } from "express";
import { finishPurchase } from "../controllers/tickets.controler.js";
import {
  getAll,
  getOne,
  createCart,
  deleteProduct,
  emptyCart,
  populatedCart,
  manageCartProducts,
} from "../controllers/carts.controller.js";
import errorHandler from "../middlewares/errors/index.js";

//Inicializar servicios
const router = Router();

//Método asyncrono para obtener todos los carritos
router.get("/", getAll);

//Método asyncrono para obtener un carrito
router.get("/:cid", getOne);

//Método asyncrono para mostrar los productos del carrito
router.get("/populated/:cid", populatedCart);

//Método asyncrono para crear un carrito
router.post("/", createCart);

//Método asyncrono para agregar productos al carrito
router.post("/:cid/product/:pid", manageCartProducts);

//Método asyncrono para eliminar productos del carrito
router.delete("/:cid/product/:pid", deleteProduct);

//Método asyncrono para vaciar el carrito
router.delete("/:cid", emptyCart);

//Método asyncrono que finaliza la compra
router.post("/:cid/purchase", finishPurchase);

//Manejo de errores
router.use(errorHandler);

export default router;
