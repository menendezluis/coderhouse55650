export default class UsersRepository {
  constructor(UserModel) {
    this.userModel = UserModel;
  }

  async createUser(user) {
    try{
    return await this.userModel.create(user);
    }
    catch(error){
      throw error;
    }
  }

  async getUser(data) {
    try{
    return await this.userModel.findOne(data).lean();
    }
    catch(error){
      throw error;
    }
  }

  async updateUser(id, update, options = { new: true, lean: true }) {
    return await this.userModel.findOneAndUpdate(id, update, options);
  }
}
