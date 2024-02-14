import { Router } from "express";
import jwt from "jsonwebtoken";
//const router = Router();

export default class Routers {
  constructor() {
    this.router = Router();
    this.init();
  }
  init() {}

  get(path, policies, ...callback) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callback)
    );
  }
  post(path, policies, ...callback) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponse,
      this.applyCallbacks(callback)
    );
  }
  put(path, ...callback) {
    this.router.put(path, this.applyCallbacks(callback));
  }
  delete(path, ...callback) {
    this.router.delete(path, this.applyCallbacks(callback));
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).json({ error: "Internal server error" }); //params[1] is the response object
      }
    });
  }

  generateCustomResponse = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendError = (error) => res.send({ status: "error", error });
    res.sendServerError = () =>
      res.send({ status: "error", error: "Internal server error" });
    res.sendUserError = (error) => res.send({ status: "error", error });
    next();
  };

  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();

    const authHeaders = req.headers.authorization;
    if (!authHeaders) return res.status(403).json({ message: "No autorizado" });
    const token = authHeaders && authHeaders.split(" ")[1];

    let user = jwt.verify(token, "CoderSecretClaseRouter");

    if (!policies.includes(user.role.toUpperCase()))
      return res.status(403).json({ message: "No autorizado" });
    req.user = user;
    next();
  };
}
