import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCartById, getChat, getHome, getLogin, getSignup, getLogout, getProducts, getRealTimeProducts } from "../controller/views.controller.js";

const viewsRouter = Router();

viewsRouter.get("/cart/:cid", getCartById);
viewsRouter.get("/products", getProducts);
viewsRouter.get("/realtimeproducts", getRealTimeProducts);
viewsRouter.get("/chat", getChat);
viewsRouter.get("/", getHome);
viewsRouter.get("/login", isAuthenticated, getLogin);
viewsRouter.get("/signup", isAuthenticated, getSignup);
viewsRouter.get("/logout", getLogout);

export default viewsRouter;

