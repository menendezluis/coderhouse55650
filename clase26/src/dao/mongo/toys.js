import toysModel from "./models/toys.model.js";
export default class ToysDao {
  constructor() {}

  async getToys() {
    try {
      const toys = await toysModel.find();
      return toys;
    } catch (error) {
      console.error("Error al obtener los juguetes", error);
    }
  }

  async saveToy(toy) {
    try {
      const newToy = new toysModel(toy);
      await newToy.save();
      return newToy;
    } catch (error) {
      console.error("Error al guardar el juguete", error);
    }
  }

  async getToyById(id) {
    try {
      const toy = await toysModel.findById(id);
      return toy;
    } catch (error) {
      console.error("Error al obtener el juguete", error);
    }
  }
}
