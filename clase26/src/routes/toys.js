import { Router } from "express";
import { getToyById, getToys, saveToy } from "../controller/toys.controller.js";

const router = Router();

router.get("/", getToys);
router.get("/:id", getToyById);
router.post("/", saveToy);

export default router;
