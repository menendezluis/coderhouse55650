export default class CartsController {
  constructor(CartsService) {
    this.cartsService = CartsService;
  }
  createCart = async (req, res) => {
    try {
      await this.cartsService.createCart({});

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

  getCarts = async (req, res) => {
    try {
      const carts = await this.cartsService.getCarts();

      res.status(200).json({
        success: true,
        data: carts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getCart = async (req, res) => {
    try {
      const { cid } = req.params;
      console.log("cid", cid);
      const cart = await this.cartsService.getCartById(cid);

      if (!cart) {
        res.status(404).json({
          success: false,
          message: "Cart not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await this.cartsService.cartRepo.addProductAndUpdate(
        cid,
        pid
      );

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
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateProductQuantity = async (req, res) => {
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
  };

  removeProductFromCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const cart = await cartsService.removeProductFromCart(cid, pid);

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
  };

  deleteCart = async (req, res) => {
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
  };

  cartPurchase = async (req, res) => {
    try {
      const { cid } = req.params;
      const cart = await cartsService.getCartById(cid);
      const insufficientStock = [];
      const buyProducts = [];

      if (!cart)
        return res
          .status(404)
          .json({ success: false, message: "Cart not found" });
      cart.products.forEach(async (item) => {
        const product = item.product;
        const quantity = item.quantity;
        const stock = product.stock;

        quantity > stock
          ? insufficientStock.push(product)
          : buyProducts.push({ product, quantity }) &&
            (await productsService.updateProduct(product, {
              stock: stock - quantity,
            })) &&
            (await cartsService.removeProductFromCart(cart, product));
      });

      const totalAmount = buyProducts.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      const totalPrice = buyProducts
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        .toFixed(3);

      if (!buyProducts.length)
        return res.status(400).json({
          status: "Error",
          message: "No products were purchased",
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
}

//   if(buyProducts.length > 0){
//               const ticket = await ticketService.createTicket({
//                   code: uuidv4(),
//                   amount: totalAmount,
//                   purchaser: req.user.email,
//               })

//               await transport.sendMail({
//                   from: objectConfig.gmailUser,
//                   to: req.user.email,
//                   subject: "Thanks for your purchase",
//                   html:`<div>
//                               <h1>
//                                   Thanks for your purchase.
//                                   the total to pay is ${totalPrice}$
//                               </h1>
//                               <img src="cid:gracias-por-comprar">
//                         </div>`,
//                   attachments:[{
//                       filename:'gracias-por-comprar.jpg',
//                       path:"src/public/images/gracias-por-comprar.jpg",
//                       cid:'gracias-por-comprar'
//                   }]
//               })

//               return res.send({status:"Success", message:"Successful purchase", toTicket: ticket})
//           }
//       } catch (error) {
//           logger.error(error)

//       }
//   }
// });
