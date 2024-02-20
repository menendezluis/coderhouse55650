import express from "express";
import { fork } from "child_process";
//import operacionCompleja from "./operacion.js";

const app = express();

app.use(express.json());

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/suma", (req, res) => {
  const child = fork("./src/operacion.js");
  child.send("iniciamos el calculo");
  child.on("message", (result) => {
    res.json({ result });
  });
});
export default app;
