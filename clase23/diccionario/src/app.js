import express from "express";
import dictionaryRouter from "./routes/dictionary.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", dictionaryRouter);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
