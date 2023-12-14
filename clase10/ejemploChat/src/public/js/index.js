const socket = io();

let user = prompt("Ingrese su nombre de usuario");
socket.emit("new-user", {
  user: user,
  id: socket.id,
});

let chatBox = document.getElementById("chatBox");

chatBox.addEventListener("keyup", (e) => {
  console.log("estoy por aca");
  if (e.key === "Enter") {
    socket.emit("message", {
      user,
      message: chatBox.value,
    });
    chatBox.value = "";
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let message = "";

  data.forEach((elem) => {
    message += `
     
        <div class="chat-message">
        <div class="message-bubble">
  
          <div class="message-sender" >${elem.user}</div>
          <p>${elem.message}</p>
          <button id="deleteData">Eliminar</button>
          </div>
  
        </div>
      `;
  });

  log.innerHTML = message;
});
