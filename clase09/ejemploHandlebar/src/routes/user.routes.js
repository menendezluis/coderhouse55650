import e, { Router } from "express";

const router = Router();

let usuarios = [
  {
    id: 1,
    nombre: "Agustin",
    apellido: "Garcia",
    edad: 25,
    email: "agustin@gmail.com",
    active: true,
  },
  {
    id: 2,
    nombre: "Juan",
    apellido: "Perez",
    edad: 30,
    email: "juan@gmail.com",
    active: true,
  },
  {
    id: 3,
    nombre: "Pedro",
    apellido: "Gomez",
    edad: 40,
    email: "pedro@gmail.com",
    active: true,
  },
  {
    id: 4,
    nombre: "Maria",
    apellido: "Gonzalez",
    edad: 50,
    email: "maria@gmail.com",
    active: true,
  },
  {
    id: 5,
    nombre: "Jose",
    apellido: "Rodriguez",
    edad: 60,
    email: "jose@gmail.com",
    active: true,
  },
];

router.get("/", (req, res) => {
  const idRandom = Math.floor(Math.random() * (usuarios.length - 1)) + 1;
  const usuario = usuarios[idRandom];
  usuario.title = `Usuario ${usuario.nombre}`;

  res.render("usuario", usuario);
});
router.get("/all", (req, res) => {
  let listaDeUsuarios = { usuarios: usuarios, title: "Listado de usuarios" };

  res.render("lista", listaDeUsuarios);
});

export default router;
