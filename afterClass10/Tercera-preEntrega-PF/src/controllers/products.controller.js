export default class ProductsController {
  constructor(ProductsService) {
    this.productsService = ProductsService;
  }

  getProducts = async (req, res) => {
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
      const pagesData = await this.productsService.getPaginatedProducts(filter);

      if (pagesData.products.length < 1) {
        res.status(404).json({
          success: false,
          message: "Could not retrieve products",
        });
        return;
      }

      //console.log(pagesData);
      res.status(200).json({
        success: true,
        data: pagesData,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;

      const product = await this.productsService.getProductById(pid);

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
  };

  createProduct = async (req, res) => {
    try {
      const { product } = req.body;
      const newProduct = await this.productsService.createProduct(product);

      if (!newProduct) {
        res.status(400).json({
          success: false,
          message: "Could not add the product",
        });
        return;
      }

      const products = await this.productsService.getProducts();

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const { product } = req.body;

      const updatedProduct = await this.productsService.updateProduct(
        pid,
        product
      );

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
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;

      await productsService.deleteProductById(pid);

      const products = await this.productsService.getProducts();

      res.status(200).json({
        success: true,
        message: `Product with ID ${pid} was deleted.`,
        products,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}
