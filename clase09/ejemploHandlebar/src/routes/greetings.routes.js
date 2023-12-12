import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  let nombre = "Agustin";

  let saludo = { title: "Saludos cordiales", name: nombre };

  res.render("saludo", saludo);
});

export default router;
