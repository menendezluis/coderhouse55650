//Mostrar contraseña
const eyeOpen = document.getElementById("eye-open");
const password = document.getElementById("password");
const eyeClose = document.getElementById("eye-close");
const eyeContainer = document.getElementById("eye-container");

const showPassword = () => {
  if (eyeOpen.classList.contains("show-password")) {
    password.type = "text";
  } else {
    password.type = "password";
  }
};

eyeContainer.addEventListener("click", () => {
  eyeOpen.classList.toggle("show-password");
  eyeClose.classList.toggle("show-password");
  showPassword();
});
