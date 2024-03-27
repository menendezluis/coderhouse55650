
import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";

const sessionRouter = Router();
const sessionsController = new sessionController();

sessionRouter.post("/login",  passport.authenticate("login", {}), sessionsController.login);
sessionRouter.post("/signup", passport.authenticate("signup", { session: false }), sessionsController.signup);
// sessionRouter.get("/privado", passport.authenticate("privado", { session: false }), sessionsController.privado);
sessionRouter.post("/logout", sessionsController.logout);
sessionRouter.get("/current", sessionsController.getCurrentSession);


export default sessionRouter;
