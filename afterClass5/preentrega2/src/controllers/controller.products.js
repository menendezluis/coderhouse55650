import { Router } from "express";
import { productsModel } from "../DAOs/mongodb/models/products.models.js";

const router = Router();

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
      const queryObj = JSON.parse(query);
      return queryObj;
    }
    return {};
  };

  /* limit && limit = limit || 10;
  page && page = page || 1;
  query && query = query || {};
  sort && sort = sort || 1;*/
  const productsData = await productsModel.paginate(parsedQuery(), {
    limit: limit || 2,
    page: page || 1,
    sort: sort ? { price: isSorted() } : null,
    lean: true,
  });

  const { docs, hasPrevPage, hasNextPage, totalPages, prevPage, nextPage } =
    productsData;

  const products = docs;
  products.forEach((product) => {
    console.log(product.title);
  });

  //  const products = await productsModel.find()
  res.render("products", {
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
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

  const newProduct = await productsModel.create(newProductInfo);
  res.json({ message: "Product created", newProduct });
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
