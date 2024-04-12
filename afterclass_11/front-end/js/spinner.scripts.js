//Inicializar spinner
function showSpinner(data) {
  if (data.length > 0) {
    setTimeout(() => {
      document
        .getElementsByTagName("body")[0]
        .classList.remove("overflow-hidden");
      if (document.getElementById("pagination") != null) {
        document.getElementById("pagination").classList.remove("d-none");
        document.getElementById("pagination").classList.add("d-block");
      }
      document.getElementById("navbar-top").classList.remove("d-none");
      document.getElementById("navbar-top").classList.add("d-block");
      document.getElementById("spinner").classList.add("d-none");
    }, 1000);
  }
}
