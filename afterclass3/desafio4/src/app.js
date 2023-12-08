import express from "express";
//import { ProductManager } from "./ProductManager.js";
import productRouter from "./routes/products.router.js";
const app = express();
const PORT = 8080;
//const productManager = new ProductManager("productos.json");
let productos = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log("servidor esta running en el puerto" + PORT);
});
