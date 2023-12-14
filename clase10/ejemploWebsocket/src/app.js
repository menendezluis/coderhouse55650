import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.route.js";

const app = express();
const PORT = 8080;
let visitas = 0;

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  visitas++;
  socket.on("message", (algo) => {
    console.log(algo);
  });

  socket.emit(
    "evento_para_socket_individual",
    "Hola nuevo cliente, eres el numero " + visitas
  );

  socket.broadcast.emit(
    "evento_para_todos_menos_el_que_lo_emitio",
    "este mensaje es para todos los usuarios que lo reciban menos para el que lo emitio"
  );

  socket.on("evento_para_todos", (data) => {
    console.log(data);
    socketServer.emit("evento_para_todos", data);
  });
});
