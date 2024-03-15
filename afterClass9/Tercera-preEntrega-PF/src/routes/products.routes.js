import express from "express";
import { get } from "mongoose";
import { getProducts, getProductById, postProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";

const productsRouter = express.Router();

productsRouter.get("/", getProducts);


productsRouter.get("/:pid", getProductById);
 

productsRouter.post("/", postProduct);

productsRouter.put("/:pid", updateProduct);
 

productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
