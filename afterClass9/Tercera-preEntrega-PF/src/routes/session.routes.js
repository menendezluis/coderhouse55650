// import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
// import UserModel from "../dao/models/user.model.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import UserService from "../services/db/User.service.db.js";
import { login, signup, privado, logout } from "../controller/session.controller.js";

const sessionRouter = Router();
// const userService = new UserService();

sessionRouter.post("/login", login);
sessionRouter.post("/signup", signup);
sessionRouter.get("/privado", privado);
sessionRouter.post("/logout", logout);


export default sessionRouter;
