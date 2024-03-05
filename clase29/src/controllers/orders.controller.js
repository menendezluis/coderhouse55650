/*
const getOrders = () => {};
const getOrderById = () => {};
const createOrder = () => {};
const resolveOrder = () => {};

*/
let orderService = [];

const getOrders = async (req, res) => {
  res.json(orderService);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = orderService.findIndex((u) => u.id === id);

  if (order === -1) {
    res.status(404).send("Order not found");
  }

  res.json(orderService[order]);
};

const createOrder = async (req, res) => {
  const order = req.body;
  order.id = Math.random().toString(36).substr(2, 9);
  orderService.push(order);
  res.json(order);
};

const resolveOrder = async (req, res) => {
  const { id } = req.params;
  const newOrder = req.body;
  const order = orderService.findIndex((u) => u.id === id);
  if (order === -1) {
    res.status(404).send("Order not found");
  }
  orderService[order] = newOrder;
  res.json(orderService[order]);
};

export { getOrders, getOrderById, createOrder, resolveOrder };
