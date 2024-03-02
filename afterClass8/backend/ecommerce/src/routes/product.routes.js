import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  modifyProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";

const router = Router();

//getAllProducts
router.get("/", getAllProducts);

//getProductById
router.get("/:id", getProductById);

//createProduct
router.post("/", createProduct);

//modifyProduct
router.put("/:id", modifyProduct);

//deleteProduct
router.delete("/:id", deleteProduct);

export default router;
