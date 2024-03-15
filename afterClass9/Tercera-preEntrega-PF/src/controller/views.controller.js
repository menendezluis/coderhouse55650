import ChatService from "../dao/mongo/services/db/Chat.service.db.js";
import ProductService from "../dao/mongo/services/db/Products.service.db.js";
import CartsService from "../dao/mongo/services/db/Carts.service.db.js";

const chatService = new ChatService();
const productService = new ProductService();
const cartsService = new CartsService();

async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);
    console.log(cart.products);
    res.render("carts", {
      products: cart.products,
      style: "/css/cart.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProducts(req, res) {
  try {
    const { limit = 8, page = 1, sort, category } = req.query;
    const filter = {
      options: {
        limit,
        page,
      },
    };

    if (category) {
      filter.query = { category: category };
    }

    if (sort) {
      filter.options.sort = { price: sort };
    }
    //console.log(filter);
    const pagesData = await productsService.getPaginatedProducts(filter);

    pagesData.products = pagesData.docs; // Cambio nombre de propiedad para ser más explícito
    delete pagesData.docs; // Elimino propiedad que ya no uso

    const baseUrl = `http://localhost:8080/products?limit=${limit}`;
    // Creo links para las páginas anterior de manera dinámica
    pagesData.prevLink =
      pagesData.hasPrevPage &&
      `${baseUrl}&page=${pagesData.prevPage}${sort ? "&sort=" + sort : ""}${
        category ? "&category=" + category : ""
      }`;

    pagesData.nextLink =
      pagesData.hasNextPage &&
      `${baseUrl}&page=${pagesData.nextPage}${sort ? "&sort=" + sort : ""}${
        category ? "&category=" + category : ""
      }`;

    if (pagesData.products.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not retrieve products",
      });
      return;
    }

    res.render("products", {
      title: "Listado de productos",
      data: pagesData,
      user: req.user,
      style: "css/products.css",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getRealTimeProducts(req, res) {
  try {
    const products = await productManager.getProducts();
    res.render("realtime", {
      title: "Productos en tiempo real",
      products: products,
      style: "/css/products.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getChat(req, res) {
  try {
    const messages = await chatService.findMessages();

    res.render("chat", {
      title: "Chat",
      messages: messages,
      style: "/css/chat.css",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getHome(req, res) {
  res.render("home");
}

async function getLogin(req, res) {
  res.render("login", {
    title: "Login",
  });
}

async function getSignup(req, res) {
  res.render("signup", {
    title: "Signup",
  });
}

async function getLogout(req, res) {
  res.render("logout", {
    title: "Logout",
    user: req.user,
  });
}

export {
  getCartById,
  getProducts,
  getRealTimeProducts,
  getChat,
  getHome,
  getLogin,
  getSignup,
  getLogout,
};
