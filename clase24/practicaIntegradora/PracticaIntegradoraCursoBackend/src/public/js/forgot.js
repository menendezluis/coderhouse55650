async function postForgot(email, newPassword) {
  const response = await fetch("/forgot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await response.json();
  if (data.respuesta === "ok") {
    window.location.href = "/login";
  } else {
    alert("Datos incorrectos");
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const newPassword = document.getElementById("newPassword").value;
  const newTwoPassword = document.getElementById("newTwoPassword").value;

  if (newPassword !== newTwoPassword) {
    alert("la nueva constrasena no coincide");
  } else {
    postForgot(email, newPassword);
  }
});
