const sumar = (a, b) => a + b;
function restar(a, b) {
  return a - b;
}
const multiplicar = (a, b) => a * b;
function dividir(a, b) {
  return a / b;
}

const operacion = (a, b, callback) => {
  console.log("Realizaremos una operacion");
  let resultado = callback(a, b);

  console.log(`El resultado de la operacion ${callback?.name} es ${resultado}`);
};

operacion(5, 6, sumar);
operacion(5, 6, restar);
operacion(5, 6, multiplicar);
operacion(5, 6, dividir);
