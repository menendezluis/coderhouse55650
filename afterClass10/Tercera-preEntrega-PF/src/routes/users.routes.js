import express from "express";
import services from "../services/factory.js";
import UsersController from "../controllers/user.controller.js";


const usersRouter = express.Router();
const usersController = new UsersController(services.userService);

usersRouter.get("/", usersController.getUsers);
usersRouter.get("/:uid", usersController.getUserById);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:uid", usersController.modifyUser);
usersRouter.delete("/:uid", usersController.deleteUser);

export default usersRouter;
