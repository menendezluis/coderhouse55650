import config from "../config/config.js";
import repositories from "../dao/repositories/index.js";

const services = {};

switch (config.persistence) {
  case "MONGO":
    const { default: CartServiceDb } = await import("./db/carts.service.db.js");
    const { default: ProductServiceDb } = await import(
      "./db/products.service.db.js"
    );
    const { default: UserServiceDb } = await import("./db/users.service.db.js");
    const { default: ChatServiceDb } = await import("./db/chat.service.db.js");
    const { default: TicketServiceDb } = await import(
      "./db/ticket.service.db.js"
    );

    services.cartsService = new CartServiceDb(repositories.carts);
    services.productService = new ProductServiceDb(repositories.products);
    services.userService = new UserServiceDb(repositories.users);
    services.chatService = new ChatServiceDb(repositories.chat);
    services.ticketService = new TicketServiceDb(repositories.tickets);

    break;
  case "FS":
    const { default: CartServiceFs } = await import(
      "../services/db/cart.service.fs.js"
    );
    const { default: ProductServiceFs } = await import(
      "../services/db/product.service.fs.js"
    );
    const { default: UserServiceFs } = await import(
      "../services/db/user.service.fs.js"
    );
    const { default: ChatServiceFs } = await import(
      "../services/db/chat.service.fs.js"
    );
    const { default: TicketServiceFs } = await import(
      "../services/db/ticket.service.fs.js"
    );

    services.cartsService = new CartServiceFs("./fs/data/carts.json");
    services.productService = new ProductServiceFs("./fs/data/products.json");
    services.userService = new UserServiceFs("./fs/data/users.json");
    services.chatService = new ChatServiceFs("./fs/data/messages.json");
    services.ticketService = new TicketServiceFs("./fs/data/tickets.json");

    break;
}

export default services;
