const welcomeUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcome = document.getElementById("welcome-user");
  if (user.role === "admin") {
    welcome.innerHTML = `<p class="text-white-50 welcome-user-item ">Bienvenido Administrador</p>`;
  } else {
    welcome.innerHTML = `<p class="text-white-50 welcome-user-item ">Bienvenido ${user.first_name}</p>`;
  }
};

welcomeUser();
