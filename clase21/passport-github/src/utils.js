import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (savedPassword, password) => {
  console.log(savedPassword);
  console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(10)));

  return bcrypt.compareSync(password, savedPassword);
};
