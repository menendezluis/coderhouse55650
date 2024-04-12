// Código que muestra la cantidad de productos en el carrito de compras
const cartBadge = async () => {
  const cartId = localStorage.getItem("cartId");
  const cartBadge = document.getElementById("cart-badge");

  try {
    if (!cartId) {
      cartBadge.innerText = "0";
    } else {
      const response = await fetch(
        `http://localhost:8080/api/carts/${cartId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        console.error("No se pudo obtener el carrito:", response.statusText);
      } else {
        const cart = await response.json();
        const productsQuantity = cart.data.products.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        cartBadge.innerText = `${productsQuantity}`;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

cartBadge();
