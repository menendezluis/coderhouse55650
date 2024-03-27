
const socket = io();

// Get references to elements
const addProductBtn = document.getElementById("addProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");

// Event listener for adding a product
addProductBtn.addEventListener("click", async () => {
  // Get input values
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;

  // Construct product object
  const product = {
    title: title,
    description: description,
    price: price,
    thumbnail: thumbnail,
    code: code,
    stock: stock,
  };

  try {
    // Send POST request to add product
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ product }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      reloadList(data.products);
      alert("Product added successfully");
    }
  } catch (error) {
    alert(error.message);
  }

  // Reset form
  document.getElementById("addForm").reset();
});

// Event listener for deleting a product
// deleteProductBtn.addEventListener("click", async () => {
//   const id = document.getElementById("productId").value;

//   try {
//     // Send DELETE request to delete product
//     const response = await fetch(`/api/products/${id}`, {
//       method: "DELETE",
//     });

//     const data = await response.json();
//     if (data.success) {
//       reloadList(data.products);
//       alert(`Product ${id} deleted successfully`);
//     }
//   } catch (error) {
//     alert(error.message);
//   }

//   // Reset form
//   document.getElementById("deleteForm").reset();
// });

// Event listener for "DOMContentLoaded" event
document.addEventListener("DOMContentLoaded", function () {
  // Find all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".agregar-al-carrito");

  // Attach event listener to each button
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the product ID from the button's data-product-id attribute
      const productId = this.getAttribute("data-product-id");

      // Data to send to the server
      const data = {
        productId: productId,
        quantity: 1, // Quantity of the product to add to the cart
      };

      // POST request configuration
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      // URL of the endpoint to add products to the cart
      const url = "/carts/routes";

      // Perform the POST request using fetch()
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error adding product to cart");
          }
          console.log("Product added to cart successfully");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(error.message); // Handle the error according to your needs
        });
    });
  });
});

// Function to reload product list
function reloadList(products) {
  const productList = document.getElementById("productList");
  // Clear existing product list
  productList.innerHTML = "";
  // Iterate over products and create card for each
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("productCard");
    card.innerHTML = `
      <div class="cardProduct__image">
        <img src=${product.thumbnail} alt=${product.title} />
      </div>
      <div class="cardProduct__info">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <p>${product.stock}</p>
        <p>${product.code}</p>
        <p>${product.id}</p>
      </div>
    `;
    productList.appendChild(card);
  });
}
