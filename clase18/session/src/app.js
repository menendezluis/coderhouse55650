import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
const app = express();

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(
  session({
    secret: "codersecret",
    resave: true,
    saveUninitalized: true,
  })
);

function auth(req, res, next) {
  if (req.session && req.session.admin) return next();
  else return res.sendStatus(401);
}

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Counter: ${req.session.counter}`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "pepe" || password !== "pepepass")
    return res.status(401).json({
      respuesta: "error",
    });
  req.session.username = username;

  req.session.admin = true;
  res.status(200).json({
    respuesta: "ok",
  });
});

app.get("/privado", auth, (req, res) => {
  res.send("<h1>solo clientes vip</h1>");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout OK");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
