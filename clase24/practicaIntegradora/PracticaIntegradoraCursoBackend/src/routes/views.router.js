import { Router } from "express";
import Users from "../dao/dbManagers/users.js";
import Courses from "../dao/dbManagers/courses.js";
import { passportCall } from "../utils.js";

const usersManager = new Users();
const coursesManager = new Courses();

const router = Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/users", async (req, res) => {
  let users = await usersManager.getAll();
  console.log(users);
  res.render("users", { users });
});

router.get("/courses", async (req, res) => {
  let courses = await coursesManager.getAll();
  console.log(courses);
  res.render("courses", { courses });
});

router.get("/perfil", passportCall("jwt"), async (req, res) => {
  let user = await usersManager.getBy({ email: req.user.email });
  let courses = await coursesManager.getAll();
  res.render("perfil", {
    user,
    courses,
  });
});

export default router;
