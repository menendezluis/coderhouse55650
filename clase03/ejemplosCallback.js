let miArreglo = [1, 2, 3, 4, 5, 6];

let nuevoArreglo = miArreglo.map((elemento) => elemento * 2);

let nuevoCalculo = miArreglo.map((x) => x + 1);

let reemplazamosValores = miArreglo.map((dato) => "a");
/*
console.log(nuevoCalculo);
console.log(reemplazamosValores);
*/
function isEven(valor) {
  if (typeof valor == "number") {
    return valor % 2 == 0;
  } else {
    return false;
  }
}

//console.log(isEven(2));
//console.log(isEven(5));
//console.log(isEven("a"));

let arregloParInpar = miArreglo.map(isEven);

//console.log(miArreglo);

//console.log(arregloParInpar);

console.log(4 % 2 == 0);
console.log(5 % 2 == 0);
console.log(6 % 2);
console.log(7 % 6);
