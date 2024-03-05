import DAO from "../dao/index.js";
let businessService = new DAO.Business();

const getBusiness = async (req, res) => {
  const result = await businessService.getBusiness();
  res.json(result);
};

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  const business = businessService.getBusinessById(id);

  if (!business) {
    res.status(404).send("Business not found");
  }

  res.json(business);
};
[];
const createBusiness = async (req, res) => {
  const business = req.body;
  const result = await businessService.saveBusiness(business);
  res.json({
    status: "Business saved",
    business,
  });
};

const addProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (product.name === undefined || product.price === undefined) {
    res.status(400).send("Bad request");
  }
  const businessId = businessService.addProduct(id, product);

  if (!businessId) {
    res.status(404).send("Business not found");
  }

  res.json({
    status: "Product added",
    businessId,
    product,
  });
};

export { getBusiness, getBusinessById, createBusiness, addProduct };
