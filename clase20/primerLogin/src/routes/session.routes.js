import { Router } from "express";
import UserModel from "../models/user.model.js";
import { auth } from "../middlewares/index.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await UserModel.findOne({ email });

  if (result === null) {
    res.status(400).json({
      error: "Usuario o contraseña incorrectos",
    });
  } else if (!isValidPassword(result.password, password)) {
    res.status(401).json({
      error: "Usuario o contraseña incorrectos",
    });
  } else {
    req.session.user = email;
    req.session.name = result.first_name;
    req.session.last_name = result.last_name;
    req.session.role = "admin";
    res.status(200).json({
      respuesta: "ok",
    });
  }
});
router.post(
  "/signup",
  passport.authenticate("register", {
    successRedirect: "/privado",
    failureRedirect: "/failRegister",
  }),
  async (req, res) => {
    res.send({ status: "success", mesage: "user registered" });
  }
);

router.get("/failRegister", (req, res) => {
  res.status(400).json({
    error: "Error al crear el usuario",
  });
});
/*router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, age } = req.body;

  const result = await UserModel.create({
    first_name,
    last_name,
    age,
    email,
    password: createHash(password),
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

*/

router.get("/privado", auth, (req, res) => {
  res.render("topsecret", {
    title: "Privado",
    user: req.session.user,
  });
});

router.get("/forgot", (req, res) => {
  res.render("forgot");
});
router.post("/forgot", async (req, res) => {
  const { email, newPassword } = req.body;
  const result = await UserModel.find({
    email: email,
  });

  if (result.length === 0) {
    return res.status(401).json({
      error: "Usuario o contraseña incorrectos",
    });
  } else {
    const respuesta = await UserModel.findByIdAndUpdate(result[0]._id, {
      password: createHash(newPassword),
    });
    res.status(200).json({
      respuesta: "ok",
      datos: respuesta,
    });
  }
});
export default router;
