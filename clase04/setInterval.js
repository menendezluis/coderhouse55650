const temporizador = (callback) => {
  setInterval(() => {
    if (contador < 5) {
      callback();
      contador++;
    }
  }, 1000);
};

let contador = 0;

const laOperacion = () => console.log("La operacion termino");

console.log("Iniciando operacion");
temporizador(laOperacion);

console.log("Finalizando operacion");
