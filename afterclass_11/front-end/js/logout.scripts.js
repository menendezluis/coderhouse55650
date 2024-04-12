//Cerrar sesión
const logout = () => {
  Swal.fire({
    title: "¿Estás seguro que deseas cerrar sesión?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Cerrar sesión`,
    denyButtonText: `Cancelar`,
    showClass: {
      popup: "animate__animated animate__zoomIn",
    },
    hideClass: {
      popup: "animate__animated animate__zoomOut",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Gracias por utilizar nuestros servicios",
        showConfirmButton: true,
        confirmButtonText: `Aceptar`,
        showClass: {
          popup: "animate__animated animate__zoomIn",
        },
        hideClass: {
          popup: "animate__animated animate__zoomOut",
        },
      });
      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.setItem("currentPage", 1);
        window.location.href = "http://127.0.0.1:5500/html/index.html";
      }, 2000);
    }
  });
};
