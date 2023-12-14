import { Router } from "express";

const petRouter = Router();

let pets = [];
let currentId = 1;

petRouter.get("/", (req, res) => {
  res.json({
    data: pets,
    message: pets.length === 0 ? "no hay mascotas" : "mascotas encontrados",
  });
});

petRouter.post("/", (req, res) => {
  const { name, breed, age } = req.body;

  if (!name || !breed || !age) {
    res.status(400).json({ error: "faltan datos" });
  } else {
    const newPet = { name, breed, age, id: currentId++ };
    pets.push(newPet);

    res.status(201).json({ message: "mascota agregada", data: newPet });
  }
});
export { petRouter };
