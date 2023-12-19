import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/views.routes.js";

const app = express();
const PORT = 8080;

let visitas = 0;
let messages = [];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const server = app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/", viewsRouter);

app.get("/messages", (req, res) => {
  res.json(messages);
});

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("new-user", (data) => {
    console.log("nuevo cliente conectado", data.user);

    socket.user = data.user;
    socket.id = data.id;
    visitas++;
    socket.broadcast.emit("new-user-connected", {
      message: `Se ha conectado un nuevo usuario: ${visitas}`,
      user: data.user,
    });
  });

  socket.on("message", (data) => {
    messages.push({ ...data, id: socket.id, date: new Date().toISOString() });
    io.emit("messageLogs", messages);
  });
});
