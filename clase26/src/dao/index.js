import ToysDaoMemory from "./memory/toys.js";
import UsersDaoMemory from "./memory/users.js";
import UsersDaoMongo from "./mongo/users.js";
import ToysDaoMongo from "./mongo/toys.js";
import { PERSISTENCE } from "../config/config.js";

export const toysDao =
  PERSISTENCE === "MONGO" ? new ToysDaoMongo() : new ToysDaoMemory();

export const usersDao =
  PERSISTENCE === "MONGO" ? new UsersDaoMongo() : new UsersDaoMemory();
