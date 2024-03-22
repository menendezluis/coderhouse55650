import express from "express";
import { addLogger } from "./utils/logger.js";

const app = express();
const PORT = 8080;

app.use(addLogger);

app.get("/", (req, res) => {
  req.logger.warn("Alerta maxima!!");
  res.send("Hello World");
});

app.get("/otrarruta", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
