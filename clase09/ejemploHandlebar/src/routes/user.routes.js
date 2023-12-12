import { Router } from "express";

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
    active: false,
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
    active: false,
  },
];

router.get("/", (req, res) => {
  const idRandom = Math.floor(Math.random() * (usuarios.length - 1)) + 1;
  const usuario = usuarios[idRandom];
  usuario.title = `Usuario ${usuario.nombre}`;
  usuario.style = "./style.css";

  res.render("usuario", usuario);
});

router.get("/new", (req, res) => {
  res.render("crearusuario", { title: "Crear usuario" });
});
router.get("/all", (req, res) => {
  const { admin } = req.query;

  const isAdmin = admin === "luis" ? true : false;
  let listaDeUsuarios = {
    usuarios: usuarios,
    title: "Listado de usuarios",
    style: "../stylelist.css",
    isAdmin: isAdmin,
  };

  res.render("lista", listaDeUsuarios);
});

router.get("/api/all", (req, res) => {
  res.json(usuarios);
});

router.post("/api/new", (req, res) => {
  const { nombre, apellido, edad, email, active } = req.body;

  const id = usuarios.length + 1;
  const usuario = {
    id,
    nombre,
    apellido,
    edad,
    email,
    active,
  };

  usuarios.push(usuario);

  res.json({ message: "Usuario creado" });
});

export default router;
