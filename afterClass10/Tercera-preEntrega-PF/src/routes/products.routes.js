import express from "express";
import services from "../services/factory.js";
import ProductsController from "../controllers/products.controller.js";

const productsRouter = express.Router();
const productsController = new ProductsController(services.productService);

productsRouter.get("/", productsController.getProducts);
productsRouter.get("/:pid", productsController.getProductById);
productsRouter.post("/", productsController.createProduct);
productsRouter.put("/:pid", productsController.updateProduct);
productsRouter.delete("/:pid", productsController.deleteProduct);

export default productsRouter;
