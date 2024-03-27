const sendMessageBtn = document.getElementById("send-message-btn");
const messageInput = document.getElementById("message-input");
const messageForm = document.getElementById("message-form");
const messagesList = document.getElementById("messages-list");
let user;
const socket = io();

document.addEventListener("DOMContentLoaded", () => {
  const userInput = prompt("Ingresa tu usuario") || "";

  if (!userInput) {
    alert("El usuario se registró como anónimo");
    user = "Anónimo";
    return;
  }

  user = userInput.trim();
  alert(`Bienvenido ${user}`);
});

sendMessageBtn.addEventListener("click", async () => {
  const message = messageInput.value.trim();
  if (!message) return;

  await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        alert("No se pudo enviar el mensaje");
        return;
      }

      alert("Mensaje enviado");
    })
    .catch((err) => {
      alert("Oops..., no se pudo enviar el mensaje");
      console.error(err);
    })
    .finally(() => {
      messageForm.reset();
    });
});
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

socket.on("newMessage", (messageData) => {
  const messageBox = document.createElement("div");
  messageBox.classList.add("message-box");
  messageBox.innerHTML = `
							<small class="message-user">${messageData.user}</small>
							<div class="message-text">${messageData.message}</div>
							<small class="message-time">${messageData.createdAt}</small>
							`;
  messagesList.appendChild(messageBox);
});
