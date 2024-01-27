import { Router } from "express";
import { productsModel } from "../DAOs/mongodb/models/products.models.js";
import { cartModel } from "../DAOs/mongodb/models/cart.models.js";

const router = Router();

router.get("/api", async (req, res) => {
  try {
    const result = await productsModel.find();
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});
router.get("/", async (req, res) => {
  const { limit, page, query, sort } = req.query;

  const isSorted = () => {
    if (sort === "asc") {
      return 1;
    } else {
      return -1;
    }
  };

  const parsedQuery = () => {
    if (query) {
      const queryObject = JSON.parse(query);
      return queryObject;
    }
    return {};
  };

  const productsData = await productsModel.paginate(parsedQuery(), {
    limit: limit || 10,
    page: page || 1,
    sort: sort ? { price: isSorted() } : null,
    lean: true,
  });

  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } =
    productsData;
  const products = docs;

  const carts = await cartModel.find();
  const cartId = carts[0]._id;

  res.render("products", {
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    cartId,
    style: "products.css",
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);
  res.json({ message: product });
});

router.post("/", async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } =
    req.body;

  const newProductInfo = {
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock,
  };

  try {
    const newProduct = await productsModel.create(newProductInfo);
    await newProduct.save();
    res.json({ message: "Product created", newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price, thumbnail, code, stock } =
    req.body;
  const newProductInfo = {
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock,
  };
  await productsModel.findByIdAndUpdate(id, newProductInfo);
  res.json({ message: "Product updated" });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await productsModel.findByIdAndDelete(id);
  res.json({ message: "Product deleted" });
});

export default router;
