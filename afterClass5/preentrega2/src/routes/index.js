import productsController from "../controllers/controller.products.js";
import chatController from "../controllers/controller.chat.js";
import cartController from "../controllers/controller.cart.js";

const router = (app) => {
  app.use("/products", productsController);
  app.use("/chat", chatController);
  app.use("/carts", cartController);
  //app.use('/', viewsController)
};

export default router;
