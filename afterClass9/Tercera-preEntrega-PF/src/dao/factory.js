import config from "../config/config.js";
import mongoose from "mongoose";
// import ContactsMongoDao from "./mongo/contact.mongo.js";
// import ContactsMemoryDao from "./memory/contact.memory.js";

export let Contacts;
export let Carts;
export let Products;
export let Users;
export let Chats;

switch (config.persistence) {
  case "MONGO":
    const connection = await mongoose.connect(config.DB_URL);
    const { default: CartMongo } = await import("./mongo/models/cart.mongo.js");
    const { default: ProductMongo } = await import(
      "./mongo/models/product.mongo.js"
    );
    const { default: UserMongo } = await import("./mongo/models/user.mongo.js");
    const { default: ChatMongo } = await import(
      "./mongo/models/message.mongo.js"
    );

    Carts = CartMongo;
    Products = ProductMongo;
    Users = UserMongo;
    Chats = ChatMongo;
    break;
  case "MEMORY":
    const { default: CartMem } = await import("./memory/cart.memory.js");
    const { default: ProductMem } = await import("./memory/product.memory.js");
    const { default: UserMem } = await import("./memory/user.memory.js");
    const { default: ChatMem } = await import("./memory/message.memory.js");

    Carts = CartMem;
    Products = ProductMem;
    Users = UserMem;
    Chats = ChatMem;

    break;
}

export default {
  Carts,
  Products,
  Users,
  Chats,
};
