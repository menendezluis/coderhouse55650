import { Router } from "express";
import Users from "../dao/dbManager/user.js";
import Courses from "../dao/dbManager/course.js";

const router = Router();

router.get("/users", async (req, res) => {
  const users = new Users();
  const result = await users.getAll();
  res.render("users", { users: result });
});

router.get("/courses", async (req, res) => {
  const courses = new Courses();
  const result = await courses.getAll();
  res.render("courses", { courses: result });
});

export default router;
