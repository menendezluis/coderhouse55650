import { Router } from "express";
import { StudentModel } from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const students = await StudentModel.find();
    const response = {
      message: "Lista de estudiantes",
      data: students.length > 0 ? students : "No hay estudiantes",
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentModel.findById(id);

    const response = {
      message: "estudiante encontrado",
      data: student,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, lastname, email, age, dni, course, grade } = req.body;
    const newstudent = new StudentModel({
      name,
      lastname,
      email,
      age,
      dni,
      course,
      grade,
    });
    await newstudent.save();
    const response = {
      message: "estudiante creado",
      data: newstudent,
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, age, dni, course, grade } = req.body;

  try {
    const student = await StudentModel.findByIdAndUpdate(
      id,
      { name, lastname, email, age, dni, course, grade },
      { new: true }
    );

    const response = {
      message: "estudiante actualizado",
      data: student,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentModel.findByIdAndDelete(id);

    const response = {
      message: "estudiante actualizado",
      data: student,
    };

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
export default router;
