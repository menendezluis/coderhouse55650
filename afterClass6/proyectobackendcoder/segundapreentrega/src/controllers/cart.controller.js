import { Router } from "express";
import { cartModel } from "../DAOs/mongodb/models/cart.models.js";
import { productsModel } from "../DAOs/mongodb/models/products.models.js";

const router = Router();

router.get("/api", async (req, res) => {
  try {
    const result = await cartModel.find();
    res.json({ message: result });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});
router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartModel.findById(cid).lean();
    console.log(cart);
    res.render("cart", {
      cart: cart._id.toString(),
      products: cart.products,
      style: "cart.css",
    });
    //res.json({ message: cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await cartModel.create(req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const isCartValid = await cartModel.findById(cid);
  const isProductValid = await productsModel.findById(pid);
  let hasChange = false;

  const newProduct = {
    product: pid,
    quantity: 1,
  };

  if (!isCartValid || !isProductValid) {
    return res.status(400).json({
      status: "error",
      message: "Cart or product not found",
    });
  }

  const productIndex = isCartValid.products.findIndex(
    (product) => product.product.equals(pid)
    // product.product.toString().includes(pid)
  );

  if (productIndex === -1) {
    isCartValid.products.push(newProduct);
    hasChange = true;
  } else {
    isCartValid.products[productIndex].quantity++;
    hasChange = true;
  }

  if (hasChange) {
    const result = await cartModel.findByIdAndUpdate(cid, {
      products: isCartValid.products,
    });
    res.json({
      status: "ok",
      message: isCartValid,
    });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const isCartValid = await cartModel.findById(cid);
  const isProductValid = await productsModel.findById(pid);
  let hasChange = false;

  const newProduct = {
    product: pid,
    quantity: 1,
  };

  if (!isCartValid || !isProductValid) {
    return res.status(400).json({
      status: "error",
      message: "Cart or product not found",
    });
  }

  const productIndex = isCartValid.products.findIndex(
    (product) => product.product.equals(pid)
    // product.product.toString().includes(pid)
  );

  if (productIndex === -1) {
    res.status(400).json({
      status: "error",
      message: "Product not found",
    });
  } else {
    isCartValid.products[productIndex].quantity--;
    if (isCartValid.products[productIndex].quantity === 0) {
      isCartValid.products.splice(productIndex, 1);
    }
    hasChange = true;
  }

  if (hasChange) {
    const result = await cartModel.findByIdAndUpdate(cid, {
      products: isCartValid.products,
    });
    res.json({
      status: "ok",
      message: isCartValid,
      result: result,
    });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cartModel.deleteOne({ _id: cid });
    res.json({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: "Internal error" });
  }
});

// Obtiene todos los productos del carrito
/*router.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find()
        res.json({ message: carts })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Obtiene un producto del carrito
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById(cid)
        res.json({ message: cart })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Crea un carrito
router.post('/', async (req, res) => {
    try {
        const cart = new cartModel()
        cart.save()
        res.send(cart)
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Agrega un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const qty = Number(quantity)
        const product = await productsModel.findById(pid)

        if (product) {
            const cart = await cartModel.findById(cid)
            const existsProduct = cart.products.find(p => p.product.equals(pid))
            console.log(existsProduct?.quantity)

            if (existsProduct) {
                const newQuantity = existsProduct.quantity + qty;
                const result = await cartModel.updateOne({ _id: cid, 'products.product': pid }, { $set: { 'products.$.quantity': newQuantity } })
                res.status(201).json({ message: result })
            } else {
                const newProduct = {
                    product,
                    quantity: qty,
                };
                const result = await cartModel.updateOne({ _id: cid }, { $push: { products: newProduct } })
                res.status(201).json({ message: result })

            }
        }
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Actualiza la cantidad de un producto
router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const result = await cartModel.updateOne({ _id: cid }, { $set: { products: { product: pid, quantity } } })
        res.json({ message: result })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Elimina todos los productos del carrito
router.delete('/:cid/products', async (req, res) => {
    try {
        const { cid } = req.params
        const result = await cartModel.delete({ _id: cid })
        res.json({ message: result })
        
    }catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

// Elimina un producto del carrito
router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = await cartModel.updateOne({ _id: cid }, { $pull: { products: { product: pid } } })
        res.json({ message: result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})
*/
export default router;
