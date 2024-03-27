import CustomError from "../customErrors/customError.js";
import typeErrors from "../customErrors/enums.js";
import {
  generateUserErrorInfo,
  genericInvalidErrorInfo,
} from "../customErrors/info.js";

const exampleTypeUser = [
  { name: "first_name", type: "string" },
  { name: "last_name", type: "string" },
  { name: "email", type: "string" },
  { name: "password", type: "string" },
];
export default class UsersController {
  constructor(UsersService) {
    this.usersService = UsersService;
  }
  getUsers = async (req, res) => {
    try {
      const usersDb = await this.usersService.get();
      const users = usersDb.map((user) => {
        return {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        };
      });
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  createUser = async (newUser) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        CustomError.createError({
          name: "Error creando usuario",
          cause: genericInvalidErrorInfo(
            "Faltan datos obligatorios",
            exampleTypeUser
          ),
          message: "Faltan datos obligatorios",
          code: typeErrors.INVALID_TYPES_ERROR,
        });
        const userDb = await this.usersService.create(newUser);
        return userDb;
      }
    } catch (error) {
      throw error;
    }
  };

  modifyUser = async (id, user) => {
    try {
      const userDb = await this.usersService.modify(id, user);
      return userDb;
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const userDb = await this.usersService.getUserById(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
  deleteUser = async (id) => {
    try {
      const userDb = await this.usersService.delete(id);
      return userDb;
    } catch (error) {
      throw error;
    }
  };
}
