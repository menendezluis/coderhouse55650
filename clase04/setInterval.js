const { time } = require("console");

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
//temporizador(laOperacion);

console.log("Finalizando operacion");

function timer() {
  var health = 100;
  var counter = setInterval(function () {
    var reduce = Math.floor(Math.random() * 15);
    health = health - reduce;
    console.log(health);
    if (health < 0) {
      clearInterval(counter);
    }
  }, 1000);
}

timer();
