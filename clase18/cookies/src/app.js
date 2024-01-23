import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(cookieParser("CoderS3CR3T"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.get("/login", (req, res) => {
  res.render("cookie");
});
app.get("/setCookie", (req, res) => {
  const { name, lastname } = req.query;
  //guardamos una cookie
  res
    .cookie(
      "CoderCookie",
      JSON.stringify({
        nombre: name,
        apellido: lastname,
      }),
      {
        maxAge: 30000,
        signed: true,
      }
    )
    .json({
      nombre: name,
      apellido: lastname,
    });
});

app.get("/getCookie", (req, res) => {
  res.send(req.cookies);
});

app.get("/clearCookie", (req, res) => {
  res.clearCookie("CoderCookie").send("Cookie eliminada");
});

app.get("/setSignedCookie", (req, res) => {
  res
    .cookie("CoderSignedCookie", "Esta es una cookie firmada", {
      maxAge: 30000,
      signed: true,
    })
    .send("Cookie firmada seteada");
});

app.get("/getSignedCookie", (req, res) => {
  res.send(req.signedCookies);
});

app.get("/saveCookie", (req, res) => {
  const { nombre, apellido } = req.query;
  console.log(req.query);
  res
    .cookie("nombre", nombre)
    .cookie("apellido", apellido)
    .send("Cookie seteada");
});

app.get("/readCookie", (req, res) => {
  const { nombre, apellido } = req.cookies;
  res.send(`Hola ${nombre} ${apellido}`);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
