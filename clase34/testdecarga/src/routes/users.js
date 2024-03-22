import { Router } from "express";
import { faker } from "@faker-js/faker";
import userModel from "../models/users.js";
const router = Router();
const users = [];

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "email and password are required" });
  }

  const user = {
    email,
    password,
  };

  const isUserInDB = await userModel.find({
    email: email,
    password: password,
  });

  if (isUserInDB) res.status(200).json({ message: "Welcome back!" });
  else res.status(401).json({ message: "Invalid credentials" });
});

router.post("/register", async (req, res) => {
  const fakerUser = {
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    sex: faker.person.sex(),
    birthDate: faker.date.birthdate(),
    phone: faker.phone.number(),
    password: faker.internet.password(),
  };

  const newUser = new userModel(fakerUser);
  await newUser.save();

  res.status(201).json({ message: "User created", date: fakerUser });
});

export default router;
