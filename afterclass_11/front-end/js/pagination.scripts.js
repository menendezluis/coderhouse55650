// Función que actualiza los botones de navegación de la paginación
const updatePagination = () => {
  const currentPage = parseInt(localStorage.getItem("currentPage"));
  const previousButton = document.getElementById("previous-page");
  const nextButton = document.getElementById("next-page");

  // Deshabilita el botón "anterior" si el usuario está en la primera página
  if (currentPage === 1) {
    previousButton.classList.add("disabled");
    previousButton.disabled = true;
  } else {
    previousButton.classList.remove("disabled");
    previousButton.disabled = false;
  }

  // Deshabilita el botón "siguiente" si el usuario está en la última página
  if (currentPage === 4) {
    nextButton.classList.add("disabled");
    nextButton.disabled = true;
  } else {
    nextButton.classList.remove("disabled");
    nextButton.disabled = false;
  }
};

// Función que maneja el evento de clic en el botón "anterior"
const previousPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage > 1) {
    currentPage -= 1;
    productsHandler("page", currentPage);
    localStorage.setItem("currentPage", currentPage);
    setActivePage(currentPage);
  }
  updatePagination();
  activePage();
};

// Función que maneja el evento de clic en el botón "siguiente"
const nextPage = () => {
  let currentPage = localStorage.getItem("currentPage");
  currentPage = parseInt(currentPage);
  if (currentPage < 4) {
    currentPage += 1;
    productsHandler("page", currentPage);
    localStorage.setItem("currentPage", currentPage);
    setActivePage(currentPage);
  }
  updatePagination();
  activePage();
};

// Evento que se dispara cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  updatePagination();
});

// Función que establece la página activa en la paginación
const setActivePage = (page) => {
  const elements = document.querySelectorAll(`li[data-page]`);
  elements.forEach((element) => {
    if (element.dataset.page === page) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
  localStorage.setItem("currentPage", page);
  productsHandler("page", page);
  updatePagination();
};

// Función que establece la página activa en la paginación al cargar la página
const activePage = () => {
  const currentPage = localStorage.getItem("currentPage");
  setActivePage(currentPage);
};

// Evento que se dispara cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = localStorage.getItem("currentPage");
  if (!currentPage) {
    setActivePage("1");
  } else {
    setActivePage(currentPage);
  }
  const elements = document.querySelectorAll(`li[data-page]`);
  elements.forEach((element) => {
    // Agrega un evento de clic a cada elemento de la paginación
    element.addEventListener("click", () => {
      setActivePage(element.dataset.page);
    });
  });
});
