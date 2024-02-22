import usersModel from "./models/users.model.js";
export default class UsersDao {
  constructor() {}

  async getUsers() {
    try {
      const users = await usersModel.find();
      return users;
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  }

  async saveUser(user) {
    try {
      const newUser = new usersModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  }

  async getUserById(id) {
    try {
      const user = await usersModel.findById(id);
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario", error);
    }
  }
}
