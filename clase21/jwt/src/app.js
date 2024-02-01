import express from "express";
import { generateToken, authToken } from "./utils.js";

const app = express();
const PRIVATEKEY = "CoderKeySuperSecreatNadieDebeSaberlo";

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
const users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/register", (req, res) => {
  const { name, email, password } = req.body;
  const existe = users.find((user) => user.email === email);
  if (existe) {
    res.status(400).json({ error: "El usuario ya existe" });
  }
  const newUser = { name, email, password };
  users.push(newUser);

  const access_token = generateToken({
    email: newUser.email,
    name: newUser.name,
  });

  res.status(201).json({ status: "success", access_token });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = user.find(
    (user) => user.email === emai && user.password === password
  );

  if (!user) {
    res.status(400).json({ error: "Usuario o contraseña incorrectos" });
  }

  const access_token = generateToken({
    email: user.email,
    name: user.name,
  });

  res.status(200).json({ status: "success", access_token });
});

app.get("/private", authToken, (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to the private" });
});
