// Función para crear un usuario
async function postSignup(first_name, last_name, username, password) {
  const data = {
    first_name,
    last_name,
    email: username,
    password,
  };

  const response = await fetch("http://localhost:8080/api/sessions/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: result.error,
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });
    return false;
  } else {
    Swal.fire({
      icon: "success",
      title: "Usuario creado correctamente",
      confirmButtonText: "Aceptar",
      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    }).then(() => {
      window.location.href = "../html/index.html";
    });
    return true;
  }
}

// Escucha el evento submit del formulario de registro
const signupForm = document.getElementById("signup-form");

// Captura los datos del formulario de registro
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const last_name = document.getElementById("last_name").value;
  const first_name = document.getElementById("first_name").value;

  // Envía los datos del formulario de registro y crea un usuario
  postSignup(first_name, last_name, username, password);
});
