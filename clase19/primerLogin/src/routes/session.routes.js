import { Router } from "express";
import UserModel from "../models/user.model.js";
import { auth } from "../middlewares/index.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await UserModel.findOne({ email, password });

  if (result === null) {
    res.status(400).json({
      error: "Usuario o contraseña incorrectos",
    });
  } else {
    req.session.user = email;
    req.session.role = "admin";
    res.status(200).json({
      respuesta: "ok",
    });
  }
});
router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, age } = req.body;

  const newUser = {
    first_name,
    last_name,
    email,
    password,
    age,
    role: "user",
  };
  console.log(email);

  const result = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password,
  });

  if (result === null) {
    res.status(400).json({
      error: "Error al crear el usuario",
    });
  } else {
    req.session.user = email;
    req.session.role = "admin";
    res.status(201).json({
      respuesta: "Usuario creado con éxito",
    });
  }
});

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    title: "Privado",
    user: req.session.user,
  });
});

export default router;
