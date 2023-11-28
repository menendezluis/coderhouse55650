import { createFile, readFile, updateFile, deleteFile } from "./helpers.js";
import fs from "fs";
import crypto from "crypto";

const FILE_NAME = "./usuarios.json";
const secret = "coder secret";
export default class UserManager {
  constructor() {
    this.users = [];
  }

  getUsers(user) {
    if (fs.existsSync(FILE_NAME)) {
      this.users = readFile(FILE_NAME);
      return this.users;
    }
  }
  createUser(user) {
    if (!user.password) {
      throw new Error("El usuario debe tener contraseña");
    }

    (user.password = crypto
      .createHmac("sha256", secret)
      .update(user.password)
      .digest("hex")),
      console.log("creando el hash", user.password);
    this.users.push(user);
    createFile(JSON.stringify(this.users), FILE_NAME);
  }

  updateUser(user) {
    this.users.push(user);
    updateFile(JSON.stringify(this.users), FILE_NAME);
  }

  validateUser = (user, password) => {
    const userFound = this.users.find((u) => u.nombre === user);
    if (!userFound) {
      throw new Error("El usuario no existe");
    }
    const passwordHash = crypto
      .createHmac("sha256", secret)
      .update(password.toString())
      .digest("hex");

    console.log("validando el hash:", passwordHash);
    if (userFound.password !== passwordHash) {
      throw new Error("Contraseña incorrecta");
    }
    return true;
  };
}
