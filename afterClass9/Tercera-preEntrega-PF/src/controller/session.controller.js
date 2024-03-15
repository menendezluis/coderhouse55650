import { usersService } from "../repository/index.js";

const UserService = usersService;
async function login(req, res) {
  try {
    if (!req.loginSuccess) {
      res.status(401).json({ success: false, message: "user not found" });
    } else {
      res.status(200).json({
        success: true,
        message: "user logged in",
        redirectUrl: "/products",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
}

async function signup(req, res) {
  const { first_name, last_name, email, password, age } = req.body;
  const newUser = { first_name, last_name, email, password, age };
  const checkcIfUser = await usersService.getUserByEmail(email);
  try {
    if (checkcIfUser) {
      res.status(400).json({ success: false, message: "user already exists" });
    } else {
      const response = await usersService.createUser(newUser);
      res.status(201).json({
        success: true,
        message: "user created",
        data: response,
        redirectUrl: "/login",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
}

async function privado(req, res) {
  try {
    res.render("topsecret", {
      title: "Privado",
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
}

async function logout(req, res) {
  try {
    req.session.destroy((error) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      } else {
        res.status(200).json({
          success: true,
          message: "User logged out",
          redirectUrl: "/login",
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export { login, signup, privado, logout };

//65b2d4132440be292ec978c6
