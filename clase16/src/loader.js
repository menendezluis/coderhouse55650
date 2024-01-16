import { usersList } from "../data.js";
import { UserModel } from "./models/user.model.js";

export default async function loadUsers() {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany(usersList);
    console.log("Usuarios cargados");
  } catch (error) {
    console.log(error);
  }
}
