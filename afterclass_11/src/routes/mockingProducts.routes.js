import { Router } from "express";
import getProducts from "../controllers/mockingProducts.controller.js";

const router = Router();

router.get("/", getProducts);

export default router;
