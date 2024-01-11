import { Router } from "express";
import Users from "../dao/dbManager/user.js";

const router = Router();
const users = new Users();

router.get("/", async (req, res) => {
  const result = await users.getAll();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await users.getById(req.params.id);
  res.json(result);
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, dni, age, course } = req.body;

    const result = await users.saveUser({
      first_name,
      last_name,
      email,
      dni,
      age,
      course,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, dni, age, course } = req.body;

    const newUser = { first_name, last_name, email, dni, age, course };
    const response = await users.updateUser(id, newUser);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await users.deleteUser(id);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
