import { usersDao } from "../dao/index.js";

async function getUsers(req, res) {
  const users = await usersDao.getUsers();
  res.send(users);
}

const saveUser = async (req, res) => {
  const user = req.body;
  const userSaved = await usersDao.saveUser(user);
  res.send(userSaved);
};

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await usersDao.getUserById(id);
  res.send(user);
}

export { getUsers, saveUser, getUserById };
