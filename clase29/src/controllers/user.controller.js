/*const getUsers = () => {};
const getUserById = () => {};
const saveUser = () => {};
*/
let userService = [];

const getUsers = async (req, res) => {
  res.json(userService);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = userService.findIndex((u) => u.id === id);

  if (user === -1) {
    res.status(404).send("User not found");
  }

  res.json(userService[user]);
};

const saveUser = async (req, res) => {
  const user = req.body;
  user.id = Math.random().toString(36).substr(2, 9);
  userService.push(user);
  res.json(user);
};

export { getUsers, getUserById, saveUser };
