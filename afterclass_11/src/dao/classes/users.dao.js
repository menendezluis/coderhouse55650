import usersModel from "../models/users.model.js";

export default class UsersDao {
  //Método asyncrono realizar el login
  login = async (username, password) => {
    try {
      const result = await usersModel.find({
        email: username,
        password,
      });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Metodo asyncrono para realizar el signup
  signup = async (user) => {
    try {
      const result = await usersModel.create(user);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para obtener un usuario
  getOne = async (uid) => {
    try {
      const result = await usersModel.find({ email: uid });
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Metodo asyncrono que actualiza la contraseña
  updatePassword = async (user, newPassword) => {
    try {
      const respuesta = await usersModel.findByIdAndUpdate(user, {
        password: newPassword,
      });
      return respuesta;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  //Método asyncrono para actualizar el carrito
  updateCart = async (id, user) => {
    try {
      const respuesta = await usersModel.findByIdAndUpdate(id, user);
      return respuesta;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para cambiar el role del usuario
  updateRole = async (id, role) => {
    try {
      const respuesta = await usersModel.findByIdAndUpdate(id, { role: role });
      return respuesta;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // Método asyncrono para popular el carrito
  populatedCart = async (id) => {
    try {
      const result = await usersModel.findById(id);
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}
