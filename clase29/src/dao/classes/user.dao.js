import userModel from "../models/user.model.js";

export default class User {
  getUsers = async () => {
    try {
      return await userModel.find();
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };
  getUserById = async (id) => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.error("Error al obtener el usuario", error);
    }
  };

  saveUser = async (user) => {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.error("Error al guardar el usuario", error);
    }
  };

  updateUser = async (id, user) => {
    try {
      let result = userModel.findByIdAndUpdate(id, user);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
