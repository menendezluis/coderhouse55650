import DAO from "../dao/index.js";
let orderService = new DAO.Order();
let businessService = new DAO.Business();
let userService = new DAO.User();

const getOrders = async (req, res) => {
  const result = await orderService.getOrders();
  res.json(result);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id);

  if (!order) {
    res.status(404).send("Order not found");
  }

  res.json(order);
};

const createOrder = async (req, res) => {
  const { user, business, products } = req.body;
  let userFound = await userService.getUserById(user);
  let businessFound = await businessService.getBusinessById(business);
  let actualOrders = businessFound.productos.filter((product) =>
    products.includes(product.id)
  );

  let sum = actualOrders.reduce((acc, product) => {
    return acc + product.price;
  }, 0);

  let orderNumber = Date.now() + Math.floor(Math.random() * 1000);

  let newOrder = {
    number: orderNumber,
    business,
    user,
    status: "pending",
    products: actualOrders.map((product) => product.id),
    totalPrice: sum,
  };

  let result = await orderService.createOrder(newOrder);
  res.send({ status: "success", result: result });
};

const resolveOrder = async (req, res) => {
  const { id } = req.params;
  const newOrder = req.body;
  let orderById = await orderService.getOrderById(req.params.oid);
  if (!orderById) {
    res.status(404).send("Order not found");
  }
  const order = await orderService.resolveOrder(id, newOrder);

  res.json({
    status: "Order modified",
    order,
  });
};

export { getOrders, getOrderById, createOrder, resolveOrder };
