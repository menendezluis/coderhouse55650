import Router from "./router.js";
import jwt from "jsonwebtoken";

export default class UserRouter extends Router {
  init() {
    /*// ejemplo de custom response

    this.get("/", (req, res) => {
      res.sendUserError("oops, no tienes permido para esta opcion!");
    });
    this.get("/saludar", (req, res) => {
        res.sendSuccess("oops, no tienes permido para esta opcion!");
      });
  
      */
    // ejemplo de policies

    this.get("/", ["PUBLIC"], (req, res) => {
      res.sendSuccess("Bienvenido a la home");
    });

    this.get("/premiumcoders", ["USER", "USER_PREMIUM"], (req, res) => {
      res.sendSuccess("Bienvenido a la home de premium coders");
    });

    this.post("/login", ["PUBLIC"], async (req, res) => {
      let user = {
        email: req.body.email,
        role: "user",
      };
      let token = jwt.sign(user, "CoderSecretClaseRouter");
      res.sendSuccess({
        status: "success",
        access_token: token,
      });
    });
  }
}
