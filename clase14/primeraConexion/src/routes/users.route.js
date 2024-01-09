import { Router } from "express";
import { UserModel } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    const response = {
      message: "Lista de usuarios",
      data: users.length > 0 ? users : "No hay usuarios",
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    const response = {
      message: "Usuario encontrado",
      data: user,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const newUser = new UserModel({ first_name, last_name, email });
    await newUser.save();
    const response = {
      message: "Usuario creado",
      data: newUser,
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email } = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      { first_name, last_name, email },
      { new: true }
    );

    const response = {
      message: "Usuario actualizado",
      data: user,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByIdAndDelete(id);

    const response = {
      message: "Usuario actualizado",
      data: user,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
export default router;
