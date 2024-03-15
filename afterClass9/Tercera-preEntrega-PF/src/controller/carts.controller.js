import { cartService } from "../repository/index.js";

const cartsService = cartService;

const createCart = async (req, res) => {
  try {
    await cartsService.createCart({});
    res.status(200).json({
      success: true,
      message: "New empty cart successfully created",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

async function getCarts(req, res) {
  try {
    const carts = await cartsService.getCarts();
    res.status(200).json({ carts });
  } catch (error) {
    console.log(error.message);
  }
}

async function getCartById(req, res) {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Cart sent",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function addProductToCart(req, res) {
  try {
    const { cid, pid } = req.params;

    const cart = await cartsService.addProductToCart(cid, pid);
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: `Product ${pid} added to cart ${cid}`,
      cart,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateCart(req, res) {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const { quantity } = req.body;
    const { cid, pid } = req.params;

    const cart = await cartsService.updateProductQuantity(pid, cid, quantity);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Product ${pid}'s quantity was modified ${cid}`,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProductFromCart(cid, pid) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartsService.deleteProductFromCart(cid, pid);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Product ${pid} deleted from cart ${cid}`,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteCart(req, res) {
  const { cid } = req.params;

  try {
    await cartsService.emptyCart(cid);
    res.status(200).json({
      success: true,
      message: `Cart ${cid} was emptied`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  createCart,
  getCarts,
  getCartById,
  updateCart,
  addProductToCart,
  deleteProductFromCart,
  deleteCart,
};
