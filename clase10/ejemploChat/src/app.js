import express from "express";
import { engine } from "express-handlebars";
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
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

socketServer.on("connection", (socket) => {
  console.log("nuevo cliente conectado");
  socket.on("new-user", (data) => {
    visitas++;

    socket.broadcast.emit("new-user-connected", {
      message: `Se ha conectado un nuevo usuario: ${visitas}`,
    });
  });

  socket.on("message", (data) => {
    console.log(data);
    // socketServer.emit("message", data);
  });
});
