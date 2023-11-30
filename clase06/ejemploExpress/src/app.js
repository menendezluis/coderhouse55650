import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("hola mundo, nuestra primera api con express");
});

app.get("/saludo", (req, res) => {
  res.send("hola clase que tal, este es un saludo.");
});

app.get("/otraruta", (req, res) => {
  res.send("hola clase que tal, este es un saludo.");
});

app.get("/bienvenida", (req, res) => {
  res.send(`<h1 style="
        color: blue;">Bienvenidos a la clase de express</h1>`);
});

app.get("/usuario", (req, res) => {
  const usuario = {
    nombre: "Luis",
    apellido: "Menendez",
    edad: 34,
  };
  res.json(usuario);
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
//console.log("creamos todo con comandos");
