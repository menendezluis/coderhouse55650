import { toysDao } from "../dao/index.js";
//const toys = []; //mi base de datos temporal

async function getToys(req, res) {
  const toys = await toysDao.getToys();
  res.send(toys);
}

const saveToy = async (req, res) => {
  const toy = req.body;
  const toySaved = await toysDao.saveToy(toy);
  res.send(toySaved);
};

async function getToyById(req, res) {
  const { id } = req.params;
  const toy = await toysDao.getToyById(id);

  res.send(toy);
}

export { getToys, saveToy, getToyById };
