import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const PORT = 8080;
const productManager = new ProductManager("productos.json");
let productos = [];

app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.get("/productos", async (req, res) => {
  const { limit } = req.query;
  try {
    let response = await productManager.getProducts();
    if (limit) {
      let tempArray = response.filter((dat, index) => index < limit);
      /* let tempArray = response.map((dat, index) => {
        return index < limit && dat;
      });
      */
      res.json({ data: tempArray, limit: limit, quantity: tempArray.length });
    } else {
      res.json({ data: response, limit: false, quantity: response.length });
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/productos/:pid", async (req, res) => {
  const { pid } = req.params;

  let product = await productManager.getProductById(parseInt(pid));

  if (product) {
    res.json({ message: "success", data: product });
  } else {
    res.json({
      message: "el producto solicitado no existe",
    });
  }
});

app.listen(PORT, () => {
  console.log("servidor esta running en el puerto" + PORT);
});
