import CartsDao from "../dao/classes/carts.dao.js";
import CartsRepository from "./repositories/carts.repository.js";
import ProductsDao from "../dao/classes/products.dao.js";
import ProductsRepository from "./repositories/products.repository.js";
import UsersDao from "../dao/classes/users.dao.js";
import UsersRepository from "./repositories/users.repository.js";
import TicketsRepository from "./repositories/ticket.repository.js";
import TicketsDao from "../dao/classes/ticket.dao.js";

export const cartService = new CartsRepository(new CartsDao());
export const productsService = new ProductsRepository(new ProductsDao());
export const usersService = new UsersRepository(new UsersDao());
export const ticketsService = new TicketsRepository(new TicketsDao());
