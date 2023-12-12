document.getElementById("crearusuario").addEventListener("click", (e) => {
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const email = document.getElementById("email").value;
  // const active = document.getElementById("active").checked;

  const usuario = {
    nombre,
    apellido,
    edad,
    email,
    active: true,
  };
  fetch("/user/api/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      window.location.href = "/user/all";
    })
    .catch((err) => console.log(err));
});
