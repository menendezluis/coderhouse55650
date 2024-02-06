import { fileURLToPath } from "url";
import { dirname } from "path";
//import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";

const PRIVATE_KEY = "CoderKeyQueNadieDebeSaber";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

/*export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (savedPassword, password) => {
  console.log(savedPassword);
  console.log(bcrypt.hashSync(password, bcrypt.genSaltSync(10)));

  return bcrypt.compareSync(password, savedPassword);
};
*/
export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
  return token;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user)
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
        });
      user.role = "admin";
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).send({ error: "Unauthorized" });
    if (req.user.role != role)
      return res.status(403).send({ error: "No permissions " });
    next();
  };
};
