async function postLogin(email, password) {
  const response = await fetch("/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.status === "success") {
    window.location.href = "/perfil";
  } else {
    alert("Datos incorrectos");
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  postLogin(email, password);
});
