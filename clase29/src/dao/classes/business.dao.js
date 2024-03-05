import businessModel from "../models/business.model.js";

export default class Business {
  getBusiness = async () => {
    try {
      const business = await businessModel.find();
      return business;
    } catch (error) {
      console.error("Error al obtener los negocios", error);
      throw error;
    }
  };

  getBusinessById = async (id) => {
    try {
      let result = await businessModel.findById(id);
      return result;
    } catch (error) {
      console.error("Error al obtener el negocio", error);
      throw error;
    }
  };

  saveBusiness = async (business) => {
    try {
      const newBusiness = new businessModel(business);
      await newBusiness.save();
      return newBusiness;
    } catch (error) {
      console.error("Error al guardar el negocio", error);
      throw error;
    }
  };

  addProduct = async (id, product) => {
    try {
      let business = await businessModel.findById(id);
      business.products.push(product);
      await business.save();
      return business;
    } catch (error) {
      console.error("Error al agregar el producto", error);
      throw error;
    }
  };
  updateBusiness = async (id, business) => {
    try {
      let result = businessModel.updateOne({ _id: id }, { $set: business });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
