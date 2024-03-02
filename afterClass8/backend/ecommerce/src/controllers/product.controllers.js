import ManagerMongoDb from "../dao/mongo/ManagerMongoDb.js";

const productManger = new ManagerMongoDb.ProductManger();
const getAllProducts = async (req, res) => {
  const { limit, page, sort, query } = req.query;
  let queryList = { limit, page, sort, query };

  try {
    const products = await productManger.getProduct(queryList);
    // res.status(200).send(products)
    res.send({ status: "success", products });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productManger.getProductById(id);
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const createProduct = async (req, res) => {
  const newProduct = {
    ...req.body,
  };
  try {
    const response = await productManger.createProduct(newProduct);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const modifyProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const response = await productManger.updateProduct(id, product);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await productManger.deleteProduct(id);
    res.send({
      message: "Product deleted successfully",
      id: id,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  modifyProduct,
  deleteProduct,
};
