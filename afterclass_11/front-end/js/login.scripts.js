// Crea un carrito vacío en la base de datos
const createCart = async () => {
  try {
    if (localStorage.getItem("cartId")) {
      return;
    }
    const response = await fetch("http://localhost:8080/api/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        products: [],
      }),
    });
    const result = await response.json();
  } catch (error) {
    console.log(error);
  }
};

// Función que captura la información del usuario y la almacena en el local storage
const getUser = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/sessions/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();
    const role = result.data.role;

    if (result) {
      localStorage.setItem("user", JSON.stringify(result.data));
    }

    const url = role === "admin" ? "realTimeProducts.html" : "products.html";
    window.location.href = `http://127.0.0.1:5500/html/${url}`;

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Capturar datos del formulario de login y los envía al servidor
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");

// Agregar un evento submit al formulario de login
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  postLogin(username, password);
});

// Función para enviar los datos de inicio de sesión al servidor
const postLogin = async (username, password) => {
  try {
    const response = await fetch("http://localhost:8080/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    localStorage.setItem("token", result.token);

    if (result.message !== "Login realizado con éxito") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
        confirmButtonText: "Aceptar",
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
    } else {
      createCart();
      getUser();
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};

// Login con GitHub
const githubLogin = () => {
  window.location.href = "http://localhost:8080/api/sessions/github";
};

// Spinner de carga
const btnSpinner = () => {
  loginButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...`;
};
