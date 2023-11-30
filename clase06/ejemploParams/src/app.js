import express from "express";

const app = express();
const PORT = 8080;

app.get("/unparametro/:nombre", (req, res) => {
  const { nombre } = req.params;
  console.log(nombre);
  console.log(req.params.nombre);
  res.send(`Hola ${nombre}`);
});

app.get("/dosparametros/:nombre/:apellido", (req, res) => {
  const { nombre, apellido } = req.params;
  console.log(nombre + " " + apellido);
  console.log(req.params.nombre, req.params.apellido);
  res.send(`Hola ${nombre} ${apellido}`);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
