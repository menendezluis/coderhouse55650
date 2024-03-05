import orderModel from "../models/order.model.js";

export default class Order {
  getOrders = async () => {
    try {
      return await orderModel.find();
    } catch (error) {
      console.error("Error al obtener las ordenes", error);
    }
  };

  getOrderById = async (id) => {
    try {
      let result = await orderModel.findById(id);
      return result;
    } catch (error) {
      console.error("Error al obtener la orden", error);
      throw error;
    }
  };
  createOrder = async (order) => {
    try {
      const newOrder = new orderModel(order);
      await newOrder.save();
      return newOrder;
    } catch (error) {
      console.error("Error al guardar la orden", error);
      throw error;
    }
  };

  resolveOrder = async (id, order) => {
    try {
      let result = orderModel.findByIdAndUpdate(id, order);
      return result;
    } catch (error) {
      console.error("Error al modificar la orden", error);
      throw error;
    }
  };
}
