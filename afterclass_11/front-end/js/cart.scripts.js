// Funcion que calcula el precio con descuento
const calculateDiscountedPrice = (price, discount = 0.85) => {
  const parsedPrice = parseFloat(price);
  const discountedPrice = (parsedPrice * discount).toFixed(2);
  return discountedPrice;
};

//Funcion que posiciona el footer al final de la pagina
const positionFixedFooter = () => {
  const footer = document.getElementById("footer");
  if (window.innerHeight > document.body.clientHeight) {
    footer.classList.add("fixed-bottom");
  } else {
    footer.classList.remove("fixed-bottom");
  }
};

// Funcion que calcula el total de la compra
const totalPurchase = (products, discount = 0.85) => {
  let total = 0;

  products.forEach((product) => {
    total += product.product.price * product.quantity;
  });

  const totalWithDiscount = (total * discount).toFixed(2);
  return totalWithDiscount;
};

// Funcion que finaliza la compra
async function finishPurchase() {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const products = JSON.parse(localStorage.getItem("cart"));
  const amountPurchase = totalPurchase(products);

  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/purchase`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: user.username,
          products: products,
          amountPurchase,
        }),
      }
    );

    const result = await response.json();

    localStorage.setItem("order", JSON.stringify(result));
    finishPurchaseAction();
  } catch (error) {
    console.error(error);
  }
}

// Funcion que confirma o rechaza la compra
const finishPurchaseAction = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, finalizar compra",
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "¡Compra finalizada con éxito!",
        text: "En unos minutos recibirás un correo con los detalles de tu compra",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.setItem("currentPage", 1);
          localStorage.removeItem("cartId");
          localStorage.removeItem("cart");
          window.location.href = "../html/orderDetails.html";
        }
      });
    }
  });
};

//Incrementa la cantidad de un producto en el carrito
const increaseQuantity = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        op: "add",
      }),
    }
  );

  const cart = await response.json();
  cartBadge();
  showCartProducts();

  return cart;
};

//Decrementa la cantidad de un producto en el carrito
const decreaseQuantity = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        op: "substract",
      }),
    }
  );

  const cart = await response.json();
  cartBadge();
  showCartProducts();
  return cart;
};

//Elimina un producto del carrito
const deleteProduct = async (idProduct) => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");

  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Aceptar",
    cancelButtonColor: "#d33",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cartId}/product/${idProduct}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal! Vuelve a intentarlo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          showClass: {
            popup: "animate__animated animate__zoomIn",
          },
        });
      }

      showCartProducts();

      Swal.fire({
        icon: "success",
        title: "Producto eliminado con exito!",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    }
  });
};

//Elimina todos los productos del carrito
const emptyCart = async () => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");

  await fetch(`http://localhost:8080/api/carts/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  showCartProducts();
};

//Elimina todos los productos del carrito
const deleteAllProducts = async () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Carrito vaciado con éxito",
        showConfirmButton: true,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
      });
      emptyCart();
      cartBadge();
    }
  });
};

//Direccionar a la pagina de productos anterior
const continueBuying = () => {
  const page = localStorage.getItem("currentPage");
  window.location.href = `http://127.0.0.1:5500/html/products.html`;
};

const showCartProducts = async () => {
  const cartId = localStorage.getItem("cartId");
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:8080/api/carts/populated/${cartId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const cart = await response.json();
    const cartData = [cart];
    showSpinner(cartData);
    const products = cart.data.products;
    localStorage.setItem("cart", JSON.stringify(products));
    let html = "";
    let cartNav = "";
    if (products.length > 0) {
      cartNav += `
        <div class="row d-flex justify-content-center align-items-center h-100 mt-4">
          <div class="col-10 ">
            <h3
              class="fw-normal text-black mb-5 text-decoration-underline text-center"
            >
              Carrito de compras
            </h3>
            <nav
              class="d-flex justify-content-between mb-3 nav-products flex-wrap"
            >
              <button
                class="btn btn-secondary btn-sm mb-2"
                onclick="continueBuying()"
                type="button"
              >
                Seguir comprando
              </button>
              <button
                class="btn btn-secondary btn-sm mb-2"
                type="button"
                onclick="deleteAllProducts()"
              >
                Vaciar carrito
              </button>
              <button
              class="btn btn-secondary btn-sm mb-2"
              type="button"
              onclick="finishPurchase()"
            >
              Finalizar compra
            </button>
            </nav> 
            </div>`;

      html += `
    <div class="card rounded-3 mb-4">
      <div class="card-body p-4">
        ${products
          .map((product) => {
            return `
          <div class="product-cart">
            <div class="row d-flex justify-content-between align-items-center mb-3 mt-3">
              ${product.product.thumbnail
                .map((img) => {
                  return `
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${img.img1}"
                          class="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                    `;
                })
                .join("")}
              <div class="col-md-3 col-lg-3 col-xl-3 mt-2">
                <p class="lead fw-normal mb-2">
                  Producto:
                  <span class="text-muted"> ${product.product.title}</span>
                </p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button
                  class="btn btn-link px-2"
                  onclick="decreaseQuantity('${product.product._id}')"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  name="quantity"
                  value="${product.quantity}"
                  type="text"
                  class="form-control form-control-sm text-center"
                />
                <button
                  class="btn btn-link px-2"
                  onclick="increaseQuantity('${product.product._id}')"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mb-4 mt-4">
                <h5 class="mb-0">
                  $${(
                    calculateDiscountedPrice(product.product.price) *
                    product.quantity
                  ).toFixed(2)}
                </h5>
              </div>
              <div
                class="col-md-1 col-lg-1 col-xl-1 text-danger trash-icon"
                onclick="deleteProduct('${product.product._id}')"
              >
                <i class="fas fa-trash fa-lg"></i>
              </div>
            </div>
          </div> `;
          })
          .join("")}
      </div>
    </div>
    <div class="py-2 text-end total-cart">
    <h5 class="d-inline-block align-middle mr-2">Total:</h5>
    <h5 class="d-inline-block align-middle ">$ ${totalPurchase(
      products
    )}</h5></div>
    </div>
    `;
    } else {
      html += `
        <nav class="d-flex mb-3 nav-products mt-5 flex-wrap justify-content-center">
          <h3 class="fw-normal text-black mb-2">Aún no hay productos</h3>
          <button class="btn btn-secondary btn-sm" type="button">
            <a href="http://127.0.0.1:5500/html/products.html"> Ir a comprar </a>
          </button>
        </nav>
      `;
    }

    document.getElementById("cart-nav-container").innerHTML = cartNav;
    document.getElementById("cart-container").innerHTML = html;
    positionFixedFooter();
  } catch (error) {
    console.error(error);
  }
};

showCartProducts();

// Abre el chat
const chatOpen = document.getElementById("chat-img-id");
const chatContainer = document.getElementById("chat1");
chatOpen.addEventListener("click", () => {
  chatContainer.classList.add("active");
});

// Cierra el chat
const chatClose = document.getElementById("chat-close");
chatClose.addEventListener("click", () => {
  chatContainer.classList.remove("active");
});
