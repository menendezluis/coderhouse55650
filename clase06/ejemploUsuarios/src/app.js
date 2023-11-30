import express from "express";

const app = express();
const PORT = 8080;

const usuarios = [
  {
    id: 1,
    nombre: "Luis",
    apellido: "Menendez",
    edad: 34,
    genero: "Masculino",
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Perez",
    edad: 25,
    genero: "Masculino",
  },
  {
    id: 3,
    nombre: "Ana",
    apellido: "Gomez",
    edad: 30,
    genero: "Femenino",
  },
];

app.get("/", (req, res) => {
  let temporalUsers = usuarios;
  const { genero } = req.query;
  if (genero) {
    temporalUsers = temporalUsers.filter(
      (user) => user.genero.toLowerCase() === genero.toLowerCase()
    );
  }

  res.json({
    msg: "Bienvenido a la api de usuarios",
    data: temporalUsers,
  });
});

app.get("/usuario/:id", (req, res) => {
  const { id } = req.params;

  const existsUser = usuarios.findIndex((user) => user.id === +id);

  if (existsUser === -1) {
    res.status(404).json({
      msg: "No se encontro el usuario",
      data: null,
    });
  }
  res.json({
    msg: "Usuario encontrado",
    data: usuarios[existsUser],
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
