import userModel from "./user.schema.js";

export default class Users {
  constructor() {}

  get = async () => {
    return await userModel.find();
  };

  findOne = async (parameter) => {
    return await userModel.findOne({ email: parameter });
  };

  create = async (user) => {
    const newUser = new userModel(user);
    await newUser.save();
    return newUser;
  };

  modify = async (id, user) => {
    return await userModel.finByIdAndUpdate(id, user, { new: true });
  };

  delete = async (id) => {
    return await userModel.findByIdAndDelete(id);
  };
} // End of Users class
