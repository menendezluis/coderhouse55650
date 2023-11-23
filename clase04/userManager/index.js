import UserManager from "./userManager.js";

const userManager = new UserManager();

const user = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 30,
};

const user2 = {
  nombre: "Luis",
  apellido: "Menendez",
  edad: 25,
};

userManager.createUser(user);
userManager.createUser(user2);
userManager.createUser(user);
userManager.createUser(user2);
userManager.createUser(user);
userManager.createUser(user2);
console.log(userManager.getUsers());
