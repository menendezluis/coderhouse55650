import { Router } from "express";
//import wordModel from "../models/word.model.js";

const router = Router();

let dictionary = [
  "hola",
  "chau",
  "perro",
  "gato",
  "casa",
  "auto",
  "calle",
  "callejon",
  "pelota",
];

router.get("/", (req, res) => {
  res.send("Bienvenido al diccionario");
});

router.param("word", (req, res, next, word) => {
  //let exists = await wordModel.findOne({ word });
  let exists = dictionary.findIndex((w) => w === word);
  if (exists === -1) {
    req.word = null;
    return res.status(404).send({ error: "Palabra no existe" });
  }
  req.word = word;
  next();
});

router.get(
  "/api/dictionary/:word([a-zA-Z%C3%A1%C3%A9%C3%AD%C3%B3%C3%BA%C3%BC]+)",
  (req, res) => {
    res.send({ word: req.params.word });
  }
);

/*
router.get("/api/dictionary/:num([0-9]+)", (req, res) => {
  const num = req.params.num;

  res.json({ num });
});
*/

export default router;
