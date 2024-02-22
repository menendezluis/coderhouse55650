export default class ToysDao {
  constructor() {
    this.toys = [];
  }

  async getToys() {
    return this.toys;
  }

  async saveToy(toy) {
    this.toys.push(toy);
    return toy;
  }

  async getToyById(id) {
    return this.toys.find((toy) => toy.id === id);
  }
}
