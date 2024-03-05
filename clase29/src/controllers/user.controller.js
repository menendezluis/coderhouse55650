import DAO from "../dao/index.js";

const userService = new DAO.User();

const getUsers = async (req, res) => {
  const result = await userService.getUsers();
  res.json(result);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.status(404).send("User not found");
  }

  res.json(user);
};

const saveUser = async (req, res) => {
  const user = req.body;
  const result = await userService.saveUser(user);
  res.json({
    status: "User saved",
    user,
  });
};

export { getUsers, getUserById, saveUser };
