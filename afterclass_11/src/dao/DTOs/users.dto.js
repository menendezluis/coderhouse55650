export default class UsersDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.username = user.username;
    this.role = user.role;
  }
}
