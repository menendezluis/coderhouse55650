import express from "express";
import userRouter from "./routes/user.route.js";
import { petRouter } from "./routes/pet.route.js";
import { __dirname } from "./utils.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(function (req, res, next) {
  console.log("Time:", Date.now().toLocaleString());
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
