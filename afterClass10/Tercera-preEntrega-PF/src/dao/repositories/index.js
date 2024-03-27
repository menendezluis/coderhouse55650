import CartsRepository from "./carts.repository.js";
import ProductsRepository from "./products.repository.js";
import UsersRepository from "./users.repository.js";
import MessagesRepository from "./messages.repository.js";

import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";
import UserModel from "../models/user.model.js";
import MessageModel from "../models/message.model.js";

export default {
  carts: new CartsRepository(CartModel),
  products: new ProductsRepository(ProductModel),
  users: new UsersRepository(UserModel),
  chat: new MessagesRepository(MessageModel),
};
