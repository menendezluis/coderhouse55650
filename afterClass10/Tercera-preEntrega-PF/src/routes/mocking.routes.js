import { Router } from "express";

const mockingRouter = Router();

mockingRouter.get("/mockingproducts", (req, res) => {
  let products = [];
  let product = {
    id: "1",
    name: "product",
    price: 100,
    stock: 10,
  };

  for (let i = 0; i < 1000; i++) {
    products.push(product);
  }

  res.send({ status: "success", totalProducts: products.length, products: products });
});

export default mockingRouter;
