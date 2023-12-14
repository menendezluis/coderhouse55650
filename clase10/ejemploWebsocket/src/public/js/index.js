const socket = io();
console.log("hola mundo");
socket.emit("message", "hola mundo me estouy comunicando desde el cliente");
socket.on("evento_para_socket_individual", (data) => {
  console.log(data);
});

socket.on("evento_para_todos_menos_el_que_lo_emitio", (data) => {
  alert(data);
});

socket.on("evento_para_todos", (data) => {
  console.log(data);
});
