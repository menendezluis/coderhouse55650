import express from "express";

const app = express();
const PORT = 8080;

app.get("/operacionsencilla", (req, res) => {
  let suma = 0;
  for (let i = 0; i < 1000000; i++) {
    suma += i;
  }
  res.json({ suma });
});

app.get("/operaciondificil", (req, res) => {
  let suma = 0;
  for (let i = 0; i < 5e8; i++) {
    suma += i;
  }
  res.json({ suma });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
