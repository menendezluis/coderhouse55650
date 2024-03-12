// loginValidator.js

function validateLogin(username, password) {
  const examplePassword = "123456";
  const exampleUsername = "coder";
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  if (typeof password === undefined) {
    throw new Error("Password es requerido");
  }

  if (typeof username === undefined) {
    throw new Error("Username es requerido");
  }

  if (password !== examplePassword) {
    throw new Error("Password es incorrecto");
  }

  if (username !== exampleUsername) {
    throw new Error("Username es incorrecto");
  }
  if (username.length < 4 || password.length < 6) {
    throw new Error(
      "Username must be at least 4 characters long and password must be at least 6 characters long"
    );
  }

  // Simplemente retornamos true si todas las validaciones pasan
  return "logueado correctamente";
}

console.log(validateLogin("coder", "123456")); // logueado correctamente
//console.log(validateLogin("coder", "otro")); // Password es incorrecto
//console.log(validateLogin("otro", "123456")); // Username es incorrecto
//console.log(validateLogin("otro", "otro")); // Username es incorrecto
//console.log(validateLogin()); // Username es incorrecto
console.log(validateLogin("coder")); // Password es requerido
