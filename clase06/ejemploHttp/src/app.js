const http = require("http"); // Importamos el modulo http

const PORT = 8080;

const server = http.createServer((request, response) => {
  response.end("haciendo cambios");
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
