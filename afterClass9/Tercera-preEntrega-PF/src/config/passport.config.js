import passport from "passport";
import passportLocal from "passport-local";
// import GitHubStrategy from "passport-github2";
// import userService from "../dao/models/user.model.js";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import UserService from "../dao/mongo/services/db/User.service.db.js";
import CartService from "../dao/mongo/services/db/Carts.service.db.js";

dotenv.config();
// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
// const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;
const userService = new UserService();
const cartService = new CartService();

const configPassport = () => {
  passport.use(
    "login",
    new passportLocal.Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },

      async function (req, username, password, done) {
        try {
          const user = await userService.getUserByEmail(username);

          if (!user) {
            req.loginSuccess = false;
            return done(null, false, { message: "User not found" });
          }
          const passwordMatches = await bcrypt.compare(password, user.password);
          if (!passwordMatches) {
            req.loginSuccess = false;
            return done(null, false, { message: "Password incorrect" });
          }
          req.loginSuccess = true;
          return done(null, user);
        } catch (error) {
          console.log(error.message);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "signup",
    new passportLocal.Strategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, username, password, done) {
        try {
          const user = await userService.getUserByEmail(username);
          if (user) {
            req.SignupSuccess = false;
            req.message = "User not found";
            return done(null, false, { message: "User already exists" });
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const { age, first_name, last_name } = req.body;

          const cart = await cartService.createCart();

          const newUser = await userService.createUser({
            email: username,
            password: hashedPassword,
            age,
            first_name,
            last_name,
            cart: cart._id,
          });

          if (!newUser) {
            req.SignupSuccess = false;
            return done(null, false, { message: "internal server error" });
          }
          req.SignupSuccess = true;
          return done(null, newUser);
        } catch (error) {
          console.log(error.message);
          return done(error);
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userService.getUserById(id);
    delete user.password;
    done(null, user);
  });
};

export default configPassport;

// const initializePassport = () => {
//   passport.use(
//     "github",
//     new GitHubStrategy(
//       {
//         clientID: GITHUB_CLIENT_ID,
//         clientSecret: GITHUB_CLIENT_SECRET,
//         callbackURL: GITHUB_CALLBACK_URL,
//       },
//       async (accessToken, refreshToken, profile, done) => {
//         try {
//             console.log(profile);
//           let user = await userService.findOne({
//             email: profile?.emails[0]?.value,
//           });
//           if (!user) {
//             const newUser = {
//               first_name: names[0],
//               last_name: names[1],
//               email: profile.emails? profile.email[0]?.value: `${names[0]}${names[1]}@generic.com`,
//               age: 20,
//               password: Math.random().toString(36).substring(7),
//             };
//             let result = await userService.create(newUser);
//             done(null, result);
//           } else {
//             done(null, user);
//           }
//         } catch (err) {
//           done(err, null);
//         }
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       let user = await userService.findById(id);
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   });
// };

// export default initializePassport;
