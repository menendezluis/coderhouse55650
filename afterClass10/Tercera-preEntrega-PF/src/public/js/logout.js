const logoutForm = document.getElementById("logout-form");

logoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await fetch("/api/sessions/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.success == true) {
    window.location.href = result.redirectUrl;
  } else {
    alert(result.message);
  }
});
