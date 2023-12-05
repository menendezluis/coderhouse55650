import express from "express";

const app = express();
const PORT = 8080;

let frase =
  "Hola coders desde express, esto es una frase extendedida, lunes 04 diciembre 2023";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.get("/api/frase", (req, res) => {
  res.json({ frase: frase });
});

app.get("/api/palabras/:pos", (req, res) => {
  let { pos } = req.params;

  let existPos = frase.includes(pos);
  let index = frase.indexOf(pos);
  existPos
    ? res.json({ buscada: pos, resultado: "si ", posicion: index })
    : res.json({ buscada: pos, resultado: "no" });
});

app.post("/api/palabras", (req, res) => {
  let { palabra } = req.body;

  frase = frase + " " + palabra;
  //frase.concat(" ",palabra)
  let index = frase.indexOf(palabra);
  res.json({ agregada: palabra, posicion: index });
});

app.put("/api/palabras/:pos", (req, res) => {
  let { palabra } = req.body;
  let { pos } = req.params;

  let existPos = frase.includes(pos);

  if (existPos) {
    frase = frase.replace(pos, palabra);
    res.json({ reemplazada: pos, nueva: palabra });
  } else {
    res.json({ mensaje: "no se encontro la palabra" });
  }
});

app.delete("/api/palabras/:pos", (req, res) => {
  let { pos } = req.params;

  let existPos = frase.includes(pos);

  if (existPos) {
    frase = frase.replace(pos, "");
    res.json({ eliminada: pos });
  } else {
    res.json({ mensaje: "no se encontro la palabra" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
