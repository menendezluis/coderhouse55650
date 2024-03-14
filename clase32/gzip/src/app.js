import express from "express";
import compression from "express-compression";

const app = express();
const PORT = 8080;

app.use(express.json());
//app.use(compression()); //gzip
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
); //brotli

app.get("/ejemplogzip", (req, res) => {
  let ejemploString = "Hola coders, este endpoint es muy pesado";

  for (let i = 0; i < 100000; i++) {
    ejemploString += " y sigue siendo pesado";
  }
  res.send(ejemploString);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
