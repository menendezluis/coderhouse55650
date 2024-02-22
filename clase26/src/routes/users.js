import { Router } from "express";
import {
  getUserById,
  getUsers,
  saveUser,
} from "../controller/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", saveUser);

export default router;
