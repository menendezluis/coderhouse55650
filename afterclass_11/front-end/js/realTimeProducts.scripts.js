// Paginación de productos
let page = 1;
// Cantidad de productos
let productsCount = 0;
const userLocalData = JSON.parse(localStorage.getItem("user"));
const userRoleInfo = userLocalData.role;
const userName = userLocalData.username;
let owner = "";

// Obtener el formulario de agregar producto
const form = document.getElementById("add-product-form");
form.addEventListener("submit", handleSubmit);

// Función para manejar el envío del formulario de actualizar producto
async function handleUpdateProduct(
  id,
  title,
  description,
  code,
  price,
  stock,
  category,
  thumbnail
) {
  try {
    const product = {
      title: title,
      description: description,
      code: code,
      price: price,
      stock: stock,
      category: category,
      thumbnail:
        thumbnail === ""
          ? {
              img1: "https://freezedepot.com/wp-content/uploads/2023/05/producto-sin-imagen.png",
            }
          : thumbnail.value,
    };

    const response = await fetch(
      `http://localhost:8080/api/realTimeProducts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      }
    );
    const result = await response.json();

    if (!result.message === "Producto actualizado con éxito") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal! Vuelve a intentarlo",
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

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, actualizar producto!",
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
          title: "¡Producto actualizado con éxito!",
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
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//Quiero que este codigo capture los datos del producto y los muestre en el formulario
const getProductToUpdate = async (id) => {
  const updateProductForm = document.getElementById("update-product-container");

  const response = await fetch(
    `http://localhost:8080/api/realTimeProducts/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const result = await response.json();

  const product = result.data;

  updateProductForm.innerHTML = `
  <h3 class="text-center mt-5 mb-5 text-decoration-underline">
          Actualizar producto
        </h3>
        <form action="" class="form-container" id="update-product-form">
          <div class="mb-3">
            <label for="title" class="form-label"> Nombre del producto: </label>
            <input
              type="text"
              class="form-control"
              id="title"
              value = "${product.title}"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label"> Descripción: </label>
            <textarea
              class="form-control"
              id="description"
              style="height: 80px"
            >${product.description}</textarea>
          </div>
          <div class="mb-3">
            <label for="code" class="form-label"> Código de producto: </label>
            <input
              type="text"
              class="form-control"
              id="code"
              value = "${product.code}"
            />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label"> Precio: </label>
            <input
              type="number"
              class="form-control"
              id="price"
              value = "${product.price}"
            />
          </div>
          <div class="mb-3">
            <label for="stock" class="form-label"> Stock: </label>
            <input
              type="number"
              class="form-control"
              id="stock"
              value = "${product.stock}"
            />
          </div>
          <div class="mb-3">
            <label for="category" class="form-label"> Categoría: </label>
            <input
              type="text"
              class="form-control"
              id="category"
              value = "${product.category}"
            />
          </div>
          <div class="mb-3">
            <label for="thumbnail" class="form-label"> Imagen: </label>
            <input
              type="text"
              class="form-control"
              id="thumbnail"
              value = "${product.thumbnail[0]["img1"]}"
            />
          </div>
          <button type="submit" class="btn btn-primary" id="submit" >
            Actualizar 
          </button>
        </form>
  `;

  const updateProductData = document.getElementById("update-product-form");
  updateProductData.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, description, code, price, stock, category, thumbnail } =
      updateProductData.elements;
    handleUpdateProduct(
      product._id,
      title.value,
      description.value,
      code.value,
      price.value,
      stock.value,
      category.value,
      thumbnail.value
    );
  });

  window.scrollTo(0, 0);
};

// Función para manejar el envío del formulario
async function handleSubmit(e) {
  e.preventDefault();
  if (userRoleInfo === "premium") {
    owner = userLocalData.username;
  } else {
    owner = "admin";
  }

  const { title, description, code, price, stock, category, thumbnail } =
    form.elements;
  if (
    !title.value ||
    !description.value ||
    !code.value ||
    !price.value ||
    !stock.value ||
    !category.value
  ) {
    return Swal.fire({
      icon: "error",
      title: "Lo siento...",
      text: "Todos los campos son necesarios!",
      focusConfirm: true,
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
  } else {
    const product = {
      title: title.value,
      description: description.value,
      code: code.value,
      price: price.value,
      stock: stock.value,
      category: category.value,
      owner: owner,
      thumbnail:
        thumbnail.value === ""
          ? {
              img1: "https://freezedepot.com/wp-content/uploads/2023/05/producto-sin-imagen.png",
            }
          : thumbnail.value,
    };

    const response = await fetch("http://localhost:8080/api/realTimeProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
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
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Producto agregado con exito!",
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
  }
  // Limpiar todos los campos del formulario
  for (let i = 0; i < form.elements.length; i++) {
    form.elements[i].value = "";
  }
  updateProductList();
}

const getProducts = async () => {
  try {
    const result = await fetch("http://localhost:8080/api/realTimeProducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (result.status === 404) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salió mal! Vuelve a intentarlo",
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

    const products = await result.json();
    showSpinner(products.data);

    return products;
  } catch (error) {
    console.log(error);
  }
};
// Función que obtiene la cantidad de productos
const getProductsData = async () => {
  const data = await getProducts();
  const productsData = Math.ceil(data.data.length / 10);
  return productsData;
};

getProductsData().then((data) => {
  productsCount = data;
});

// Función para agregar productos
const addProductBtn = () => {
  const btnAddProduct = document.getElementById("add-product-btn");
  if (page === productsCount) {
    btnAddProduct.classList.add("disabled");
  } else {
    page++;
  }
  updateProductList();
};

// Función que pagina los productos
const paginatedProducts = async (page) => {
  const productsData = await getProducts();
  const orderedProducts = productsData.data.reverse();
  const products = orderedProducts.slice(0, page * 10);
  return products;
};

// Función para actualizar la lista de productos
async function updateProductList() {
  const productList = document.getElementById("products-list");
  productList.innerHTML = "";

  try {
    const products = await paginatedProducts(page);
    const container = document.createElement("div");

    products.forEach((product) => {
      //Capturar la url de la imagen
      const imageUrl =
        product.thumbnail[0]?.img1 ??
        "https://freezedepot.com/wp-content/uploads/2023/05/producto-sin-imagen.png";

      const item = document.createElement("div");
      item.classList.add("list-group-item");

      item.innerHTML = `
        <div class="d-flex w-100  justify-content-between flex-column">
          <h2 class="mb-1 subtitle">${product.title}</h2>
          <p class="mb-1"><strong>Descripción:</strong> ${product.description}</p>
          <p class="mb-1"><strong>Codigo:</strong> ${product.code}</p>
          <p class="mb-1"><strong>Precio:</strong> ${product.price}</p>
          <p class="mb-1"><strong>Status:</strong> ${product.status}</p>
          <p class="mb-1"><strong>Stock:</strong> ${product.stock}</p>
          <p class="mb-1"><strong>Categoria:</strong> ${product.category}</p>
        </div>
        <img src="${imageUrl}" alt="img" width="150" class="thumbnail position-absolute me-5 mt-5 end-0 top-0">
        <button type="button" class="btn btn-primary update-product-btn" onclick="getProductToUpdate('${product._id}')">Actualizar</button>
        <button type="button" class="btn btn-primary delete-product-btn">Eliminar</button>
      `;

      const btnEliminar = item.querySelector(".delete-product-btn");
      btnEliminar.addEventListener("click", () => {
        eliminarProducto(product._id);
      });

      container.appendChild(item);
    });

    productList.appendChild(container);
    const deleteBtns = document.querySelectorAll(".delete-product-btn");
    const updateBtns = document.querySelectorAll(".update-product-btn");

    if (userRoleInfo === "premium") {
      deleteBtns.forEach((btn, index) => {
        if (products[index].owner == userName) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
      updateBtns.forEach((btn, index) => {
        if (products[index].owner === userName) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
    } else {
      deleteBtns.forEach((btn) => {
        btn.disabled = false;
      });
      updateBtns.forEach((btn) => {
        btn.disabled = false;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

updateProductList();

// Eliminar un producto de la lista de productos
function eliminarProducto(id) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Aceptar",
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await fetch(
        `http://localhost:8080/api/realTimeProducts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          hideClass: {
            popup: "animate__animated animate__zoomOut",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setTimeout(function () {
              window.location.reload();
            }, 500);
          }
        });
      }

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
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(function () {
            window.location.reload();
          }, 500);
        }
      });
    }
  });
}
