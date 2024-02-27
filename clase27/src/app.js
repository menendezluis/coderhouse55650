import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

app.get("/saludar", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.get("*", (req, res) => {
  res.status(404).send({ error: "Not found" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
