import express from "express";
import {
  __dirname,
  generateToken,
  passportCall,
  authorization,
} from "./utils.js";
import passport from "passport";
import initializePassport from "./passport.config.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

initializePassport();
app.use(passport.initialize());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Faltan datos" });
  }
  if (username === "coder@coder.com" && password === "1234") {
    const myToken = generateToken({ username });
    /*res.status(200).json({ status: "success", token: myToken });
  } else {
    res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }*/
    res
      .cookie("coderCookieToken", myToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .status(200)
      .json({ status: "success", token: myToken });
  } else {
    res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }
});

/*app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json(req.user);
  }
);
*/
app.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
  res.status(200).json(req.user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
