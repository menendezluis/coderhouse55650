document.addEventListener("DOMContentLoaded", function () {
  // Handlebars template source
  const productTemplateSource = document.getElementById("product-template").innerHTML;

  // Compile the Handlebars template
  const productTemplate = Handlebars.compile(productTemplateSource);

  // Function to render the product list using Handlebars
  function renderProductList(products) {
    const productListContainer = document.getElementById("product-container");
    productListContainer.innerHTML = productTemplate({ products: products });
  }

  // Function to fetch product data from the server
  async function fetchProductData() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        renderProductList(data.products);
      } else {
        console.error("Error fetching product data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  // Fetch product data when the DOM content is loaded
  fetchProductData();
});
