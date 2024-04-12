//Capturar elementos del DOM
const dropdownMenu = document.getElementById("dropdown-menu");

// Capturar el rol del usuario
const userData = JSON.parse(localStorage.getItem("user"));
let userRoleData = userData.role;

// Función para cambiar el rol del usuario
function toggleUserRole() {
  if (userRoleData === "premium") {
    userRoleData = "user";
  } else {
    userRoleData = "premium";
  }
  renderUserRoleToogle();
  updateUserRole(userRole);
}

// Función para actualizar el rol del usuario
async function updateUserRole(newRoleData) {
  const token = localStorage.getItem("token");
  const userId = user.username;

  const response = await fetch(
    `http://localhost:8080/api/sessions/premium/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role: newRoleData,
      }),
    }
  );
  const result = await response.json();

  if (!result.message === "Rol actualizado con exito") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo actualizar el rol",
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
      title: "Rol actualizado con exito",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        userData.role = newRoleData;
        localStorage.setItem("user", JSON.stringify(user));
      }
    });
  }
}

console.log;

// Función para renderizar el botón de cambio de rol
const renderUserRoleToogle = () => {
  let html = "";
  if (
    userRoleData === "premium" &&
    window.location.pathname === "/html/realTimeProducts.html"
  ) {
    html = `
    <li>
      <button class="btn dropdown-item" onclick="toggleUserRole()">
        <i class="fa-solid fa-lock-open"></i>
        Premium a Basic
      </button>
    </li>
      <li>
      <a href="products.html" class="btn dropdown-item">
        <i class="fa-brands fa-product-hunt"></i>
        Products Page
      </a>
    </li>
    <div class="dropdown-divider"></div>
    <li>
    <button class="btn dropdown-item" onclick="logout()">
        <i class="fas fa-sign-out-alt fa-fw"></i>
        Cerrar sesión
      </button>
    </li>
  `;
  } else if (
    (userRoleData === "premium" &&
      window.location.pathname === "/html/products.html") ||
    (userRoleData === "premium" &&
      window.location.pathname === "/html/cart.html")
  ) {
    html = `
    <li>
      <button class="btn dropdown-item" onclick="toggleUserRole()">
        <i class="fa-solid fa-lock-open"></i>
        Premium a Basic
      </button>
    </li>
      <li>
      <a href="realTimeProducts.html" class="btn dropdown-item">
      <i class="fa-solid fa-sliders"></i>
        Admin Panel
      </a>
    </li>
    <div class="dropdown-divider"></div>
    <li>
    <button class="btn dropdown-item" onclick="logout()">
        <i class="fas fa-sign-out-alt fa-fw"></i>
        Cerrar sesión
      </button>
    </li>
  `;
  } else if (userRoleData === "admin") {
    html = `
    <li>
    <button class="btn dropdown-item" onclick="logout()">
       <i class="fas fa-sign-out-alt fa-fw"></i>
       Cerrar sesión
     </button>
   </li>
  `;
  } else {
    html = `
    <li>
      <button class="btn dropdown-item" onclick="toggleUserRole()">
        <i class="fa-solid fa-lock"></i>
        Basic a Premium
      </button>
    </li>
    <div class="dropdown-divider"></div>
    <li>
      <button class="btn dropdown-item" onclick="logout()">
        <i class="fas fa-sign-out-alt fa-fw"></i>
        Cerrar sesión
      </button>
    </li>
  `;
  }
  dropdownMenu.innerHTML = html;
};

// Evento para renderizar el botón de cambio de rol
window.addEventListener("load", () => {
  renderUserRoleToogle();
});
