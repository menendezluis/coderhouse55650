export default class SessionsController {
  login = async (req, res) => {
    if (!req.loginSuccess) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "User logged in", redirectUrl: "/products" });
  };

  signup = async (req, res) => {
    if (!req.signupSuccess) {
      return res.status(400).json({ success: false, text: "User already exists" });
    }

    res.status(201).json({ success: true, message: "User created", redirectUrl: "/login" });
  };

  logout = async (req, res) => {
    try {
      req.session.destroy((error) => {
        if (error) {
          console.log(error);
          res.status(500).json({ success: false, message: "Internal server error" });
        } else {
          res.status(200).json({ success: true, message: "User logged out", redirectUrl: "/login" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

  getCurrentSession = async (req, res) => {
    if (!req.isAuthenticated()) {
      res.status(401).json({ message: "No hay una sesión activa" });
    } else {
      const session = {
        message: "Sesión activa",
        user: req.user,
      };
      res.status(200).json(session);
    }
  };
}
