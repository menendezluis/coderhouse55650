export default class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  //Método asyncrono realizar el login
  async userLogin(username, password) {
    const result = await this.dao.login(username, password);
    return result;
  }

  //Metodo asyncrono para realizar el signup
  async signupUser(user) {
    const result = await this.dao.signup(user);
    return result;
  }

  //Método asyncrono para obtener un usuario
  async getOneUser(uid) {
    const result = await this.dao.getOne(uid);
    return result;
  }

  //Metodo asyncrono que actualiza la contraseña
  async updateUserPassword(user, newPassword) {
    const result = await this.dao.updatePassword(user, newPassword);
    return result;
  }

  // Método asyncrono para cambiar el role del usuario
  async updateUserRole(id, role) {
    const result = await this.dao.updateRole(id, role);
    return result;
  }

  //Método asyncrono para actualizar el carrito
  async updateUserCart(id, user) {
    const result = await this.dao.updateCart(id, user);
    return result;
  }

  //Método asyncrono para popular el carrito
  async populateUserCart(cartId) {
    const result = await this.dao.populateCart(cartId);
    return result;
  }
}
