import { Router } from "express";
import {
  getBusiness,
  getBusinessById,
  createBusiness,
  addProduct,
} from "../controllers/business.controller.js";

const router = Router();

router.get("/", getBusiness);
router.get("/:id", getBusinessById);
router.post("/", createBusiness);
router.post("/:id", addProduct);

export default router;
