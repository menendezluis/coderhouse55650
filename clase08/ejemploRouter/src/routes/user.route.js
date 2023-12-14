import { Router } from "express";

const router = Router();

let users = [];
let currentId = 1;

router.get("/", (req, res) => {
  res.json({
    data: users,
    message: users.length === 0 ? "no hay usuarios" : "usuarios encontrados",
  });
});

router.post("/", (req, res) => {
  console.log("i am here");
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "faltan datos" });
  } else {
    const newUser = { name, email, password, id: currentId++ };
    users.push(newUser);

    res.status(201).json({ message: "usuario creado", data: newUser });
  }
});
export default router;
