export default class UsersDao {
  constructor() {
    this.users = [];
  }

  async getUsers() {
    return this.users;
  }

  async saveUser(user) {
    this.users.push(user);
    return user;
  }

  async getUserById(id) {
    return this.users.find((user) => user.id === id);
  }
}
