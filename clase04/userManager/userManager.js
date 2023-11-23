import { createFile, readFile, updateFile, deleteFile } from "./helpers.js";
import fs from "fs";

const FILE_NAME = "./usuarios.json";
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
    this.users.push(user);
    createFile(JSON.stringify(this.users), FILE_NAME);
  }

  updateUser(user) {
    this.users.push(user);
    updateFile(JSON.stringify(this.users), FILE_NAME);
  }
}
