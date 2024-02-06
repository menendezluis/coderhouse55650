const handleLogin = async () => {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.status === "success") {
      localStorage.setItem("token", data.token);
    } else {
      alert("Datos incorrectos");
    }
  } catch (err) {
    console.log(err);
  }
};

const buttonAction = document.getElementById("enviar");

buttonAction && buttonAction.addEventListener("click", handleLogin);
