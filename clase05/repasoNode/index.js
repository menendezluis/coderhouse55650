let arregloNumerosRandom = [];
let MAX_NUMEROS = 20;
let groupByNumeros = {};
let contador = 0;

function generarNumeroRandom(max) {
  return Math.floor(Math.random() * max + 1);
}

for (let i = 0; i < 10000; i++) {
  arregloNumerosRandom.push(generarNumeroRandom(MAX_NUMEROS));
}

arregloNumerosRandom.forEach((numero) => {
  contador++;
  if (groupByNumeros[numero]) {
    groupByNumeros[numero]++;
  } else {
    groupByNumeros[numero] = 1;
  }
});
console.log("Contador:", contador);
console.log("Resultado:", groupByNumeros);
