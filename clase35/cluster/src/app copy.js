import cluster from "cluster";
import express from "express";
import { cpus } from "os";

let counter = 0;

const numeroDeProcesadores = cpus().length;

if (cluster.isPrimary) {
  console.log(
    `Proceso primario  ${process.pid} ahora generará procesos hijos...`
  );
  for (let i = 0; i < numeroDeProcesadores; i++) {
    cluster.fork();
    counter++;
  }

  /* cluster.on("message", (worker, message) => {
    console.log(`Worker: ${worker.process.pid} - ${message}`);
  });
  */

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker: ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.json({
      pid: process.pid,
      mensaje: "Hola soy un proceso hijo",
      status: "success",
    });
  });
  app.listen(8080, () => {
    console.log(`Server listening on port `);
  });
}
