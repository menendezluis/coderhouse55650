import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import greetingsRouter from "./routes/greetings.routes.js";
import userRouter from "./routes/user.routes.js";
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/greetings", greetingsRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en http://localhost:${PORT}`);
});
