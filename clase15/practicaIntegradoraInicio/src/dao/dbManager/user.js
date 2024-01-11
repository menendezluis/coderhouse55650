import { UserModel } from "../models/user.js";

export default class Users {
  constructor() {
    console.log("Working users with database in mongodb");
  }

  async getAll() {
    let users = await UserModel.find().lean();
    return users;
  }

  async getById(id) {
    let user = await UserModel.findById(id);
    return user;
  }

  async saveUser(user) {
    let newUser = new UserModel(user);
    let result = await newUser.save();
    return result;
  }

  async updateUser(id, user) {
    const result = await UserModel.updateOne({ _id: id }, user);
    return result;
  }

  async deleteUser(id) {
    //const result = await UserModel.deleteOne({ _id: id });
    const result = await UserModel.findByIdAndDelete(id);
    return result;
  }
}
