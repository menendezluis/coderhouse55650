import { Router } from "express";
import petsModel from "../models/pets.model.js";

const router = Router();

router.param("pet", async (req, res, next, petName) => {
  try {
    let isValidPet = (validPet) => {
      let myRegex = /^[a-zA-Z%20]+$/;
      return myRegex.test(validPet);
    };

    if (isValidPet(petName)) {
      const pet = await petsModel.find({ name: petName });
      if (pet.length === 0 || pet === null) {
        req.pet = null;
        return res.status(404).send({ error: "Mascota no existe" });
      }
      req.pet = pet;
      next();
    } else {
      req.pet = null;
      return res.status(404).send({ error: "Nombre invalido" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.get("/:pet", (req, res) => {
  res.send(req.pet);
});

router.put("/:pet", async (req, res) => {
  try {
    const newPet = req.body;
    const pedId = req.pet[0]._id;
    //console.log(pedId);
    const response = await petsModel.findByIdAndUpdate(pedId, newPet, {
      new: true,
    });
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPet = req.body;
    const response = await petsModel.create(newPet);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error en el servidor" });
  }
});

export default router;
