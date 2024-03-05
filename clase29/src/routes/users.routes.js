import { Router } from "express";
import {
  getUsers,
  getUserById,
  saveUser,
} from "../controllers/user.controller.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", saveUser);

export default router;
