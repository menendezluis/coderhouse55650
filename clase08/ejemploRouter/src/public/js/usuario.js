const elementExist = (id) => (document.getElementById(id) ? true : false);

const createUser = async (user) => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  alert(data.message);
};

if (elementExist) {
  const button = document.getElementById("createUser");
  button.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUser({
      name,
      email,
      password,
    });
  });
}
