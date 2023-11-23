const temporizador = (callback) => {
  setTimeout(() => {
    callback();
  }, 5000);
};

const laOperacion = () => console.log("La operacion termino");

console.log("Iniciando operacion");
temporizador(laOperacion);
temporizador(laOperacion);
temporizador(laOperacion);
temporizador(laOperacion);
temporizador(laOperacion);

console.log("Finalizando operacion");
