import { productsService } from "../repository/index.js";

const productService = productsService;

async function getProducts(req, res) {
  try {
    const { limit = 10, page = 1, sort, category } = req.query;
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

    const products = await productService.getPaginatedProducts(filter);

    if (products.length < 1) {
      res.status(404).json({
        success: false,
        message: "Could not retrieve products",
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const { pid } = req.params;

    const product = await productService.getProductById(pid);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function postProduct(req, res) {
  try {
    const { product } = req.body;
    const newProduct = await productService.createProduct(product);

    if (!newProduct) {
      res.status(400).json({
        success: false,
        message: "Could not add the product",
      });
      return;
    }

    const products = await productService.getProducts();
    // Alternativa a HTTPs
    // req.io.emit("updateProducts", {
    // 	success: true,
    // 	products,
    // });

    res.status(200).json({
      success: true,
      // newProduct: newProduct,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { pid } = req.params;
    const { product } = req.body;

    const updatedProduct = await productService.updateProduct(pid, product);

    if (!updatedProduct) {
      res.status(400).json({
        success: false,
        message: "Could not update the product",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { pid } = req.params;
    const { product } = req.body;

    const updatedProduct = await productService.updateProduct(pid, product);

    if (!updatedProduct) {
      res.status(400).json({
        success: false,
        message: "Could not update the product",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export {
  getProducts,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
};
