import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import ViewsController from "../controllers/views.controller.js";
import services from "../services/factory.js";
const viewsController = new ViewsController(
  services.chatService,
  services.productService,
  services.cartsService
);
const viewsRouter = Router();

viewsRouter.get("/products", viewsController.renderProducts);
viewsRouter.get("/cart/:cid", viewsController.renderCarts);
viewsRouter.get("/realtimeproducts", viewsController.renderRealTime);
viewsRouter.get("/chat", viewsController.renderChat);
viewsRouter.get("/", viewsController.renderHome);
viewsRouter.get("/login", isAuthenticated, viewsController.renderLogin);
viewsRouter.get("/signup", isAuthenticated, viewsController.renderSignup);
viewsRouter.get("/logout", viewsController.renderLogout);
viewsRouter.get("/tickets", viewsController.renderTickets);

export default viewsRouter;
