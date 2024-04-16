import express from "express";
import services from "../services/factory.js";
import CartsController from "../controllers/carts.controller.js";

const cartsRouter = express.Router();
const cartsController = new CartsController(services.cartsService);

cartsRouter.post("/", cartsController.createCart);
cartsRouter.get("/", cartsController.getCarts);
cartsRouter.get("/:cid", cartsController.getCart);
cartsRouter.post("/:cid/product/:pid", cartsController.addProductToCart);
cartsRouter.put("/:cid/product/:pid", cartsController.updateProductQuantity);
cartsRouter.delete("/:cid/product/:pid", cartsController.removeProductFromCart);
cartsRouter.delete("/:cid", cartsController.deleteCart);

export default cartsRouter;

//localhost:8080/api/carts/65b2feb91d61899a7019226f/65b2d4132440be292ec978c6
