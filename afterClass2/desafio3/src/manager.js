import { ProductManager } from "./ProductManager.js";

let miPrimeraTienda = new ProductManager("./products.json");

//title, description, price, thumbnail, code, stock
miPrimeraTienda.addProduct(
  "Arroz",
  "Arroz de bolsa",
  200,
  "sin imagen",
  "005",
  10
);
miPrimeraTienda.addProduct(
  "Leche",
  "Leche descremada",
  200,
  "sin imagen",
  "002",
  10
);
miPrimeraTienda.addProduct(
  "Huevos",
  "Huevos de gallina",
  200,
  "sin imagen",
  "003",
  10
);
