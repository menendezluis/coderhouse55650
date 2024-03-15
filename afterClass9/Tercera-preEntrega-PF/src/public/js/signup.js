async function postSignup(first_name, last_name, email, password, age) {
  const data = {
    first_name,
    last_name,
    email,
    password,
    age,
  };
  try {
    const response = await fetch("/api/sessions/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, message: "invalid credentials" };
  }
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;

  const response = await postSignup(first_name, last_name, email, password, age);
  if (response.success == true) {
    window.location.href = response.redirectUrl;
  } else {
    alert(response.message);
  }
});
