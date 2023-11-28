import UserManager from "./userManager.js";

const userManager = new UserManager();

const user = {
  nombre: "Juan",
  apellido: "Perez",
  edad: 30,
  password: "123456",
};

const user2 = {
  nombre: "Romina",
  apellido: "Lopez",
  edad: 27,
  password: "abc123",
};
/*const user2 = {
  nombre: "Luis",
  apellido: "Menendez",
  edad: 25,
};*/

userManager.createUser(user);
userManager.createUser(user2);
//userManager.createUser(user);
//userManager.createUser(user2);
//userManager.createUser(user);
//userManager.createUser(user2);
//console.log(userManager.getUsers());

//console.log("incorrecto:", userManager.validateUser("Juan", "12345"));
console.log("Juan correcto:", userManager.validateUser("Juan", "123456"));
console.log("Romina correcto:", userManager.validateUser("Romina", "abc23"));
