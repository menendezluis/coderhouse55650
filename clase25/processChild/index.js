process.on("exit", (code) => {
  console.log(
    `Este codigo se ejecuta cuando el proceso termina con el codigo: ${code}`
  );
});

process.on("uncaughtException", (exception) => {
  console.log(`Este codigo se ejecuta cuando hay un error no capturado`);
});

process.on("message", (message) => {
  console.log(
    `Este codigo se ejecutra cuando reciba un mensaje de otro proceso`
  );
});

console();
