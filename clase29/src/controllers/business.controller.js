/*const getBusiness = () => {};
const getBusinessById = () => {};
const createBusiness = () => {};
const addProduct = () => {};

*/
let businessService = [];

const getBusiness = async (req, res) => {
  res.json(businessService);
};

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  const business = businessService.findIndex((u) => u.id === id);

  if (business === -1) {
    res.status(404).send("Business not found");
  }

  res.json(businessService[business]);
};
[];
const createBusiness = async (req, res) => {
  const business = req.body;
  business.id = Math.random().toString(36).substr(2, 9);
  businessService.push(business);
  res.json(business);
};

const addProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const businessId = businessService.findIndex((u) => u.id === id);

  if (businessId === -1) {
    res.status(404).send("Business not found");
  }

  if (product.name === undefined || product.price === undefined) {
    res.status(400).send("Bad request");
  }

  businessService[businessId].products.push(product);
  res.json(businessService[businessId]);
};

export { getBusiness, getBusinessById, createBusiness, addProduct };
