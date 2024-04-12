import passport from "passport";
import jwt from "passport-jwt";
import local from "passport-local";
import config from "./config.js";
import GitHubStrategy from "passport-github2";
import { usersService } from "../repository/index.js";
import { createHash } from "../utils/utils.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enum.js";
import { generateAuthErrorInfo } from "../services/errors/info.js";

// Inicializar servicios
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const ADMIN_ID = config.admin.EMAIL;
const JWT_SECRET = config.jwt.SECRET;
const ADMIN_PASSWORD = config.admin.PASSWORD;

/**
 * Inicializa la estrategia de autenticación JWT.
 */
const initializeJwtStrategy = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          const user = await usersService.getOneUser(jwt_payload.user.username);
          if (!user) {
            const error = new CustomError({
              name: "Error de autenticación",
              cause: generateAuthErrorInfo(user, EErrors.AUTH_ERROR),
              message: "Usuario inexistente",
              code: EErrors.AUTH_ERROR,
            });
            return done(error);
          } else {
            return done(null, jwt_payload);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

/**
 * Inicializa la estrategia de registro de usuarios.
 */
const initializeRegisterStrategy = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        session: false,
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, email, password, done) => {
        const { first_name, last_name } = req.body;
        const role =
          email === ADMIN_ID || password === ADMIN_PASSWORD ? "admin" : "user";
        try {
          const user = await usersService.getOneUser(email);
          if (user.lenght > 0) {
            const error = new CustomError({
              name: "Error de autenticación",
              cause: generateAuthErrorInfo(user, EErrors.AUTH_ERROR),
              message: "El usuario ya existe",
              code: EErrors.AUTH_ERROR,
            });
            return done(error);
          } else {
            const newUser = {
              first_name,
              last_name,
              email,
              password: createHash(password),
              role,
            };
            const result = await usersService.signupUser(newUser);
            return done(null, result);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

/**
 * Serializa y deserializa usuarios.
 */
passport.serializeUser((user, done) => {
  done(null, user[0].email);
});

passport.deserializeUser(async (id, done) => {
  const user = await usersService.getOneUser(id);
  done(null, user);
});

/**
 * Configura passport para loguear usuarios con GitHub.
 */
const initializeGithubStrategy = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        session: false,
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersService.getOneUser(profile?.emails[0]?.value);
          if (user) {
            return done(null, user);
          } else {
            const newUser = {
              first_name: profile.displayName.split(" ")[0],
              last_name: profile.displayName.split(" ")[1],
              email: profile?.emails[0]?.value,
              password: "123",
            };
            const userNew = await usersService.signupUser(newUser);
            return done(null, userNew);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export {
  initializeJwtStrategy,
  initializeRegisterStrategy,
  initializeGithubStrategy,
};
