import { Router } from "express";
import Courses from "../dao/dbManager/course.js";

const router = Router();

const courses = new Courses();

router.get("/", async (req, res) => {
  try {
    const response = await courses.getAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await courses.getById(id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const { title, description, teacher, students } = req.body;
  try {
    const response = await courses.saveCourse({
      title,
      description,
      teacher,
      students,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, teacher, students } = req.body;

  try {
    const newCourse = { title, description, teacher, students };

    const response = await courses.updateCourse(id, newCourse);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await courses.deleteCourse(id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
