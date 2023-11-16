let valoresBase = [1, 2, 3, 4, 5, 6];

let nuevosValores = valoresBase.map((numero, indice) => numero ** indice);
let descomponiendoValores = valoresBase.map(
  (numero, indice) => `${numero} **${indice}`
);

console.log(nuevosValores);
console.log(descomponiendoValores);

//lista de nombres
let nombres = ["Luis", "Kevin", "Juan", "Pedro", "Maria"];

function isNameIn(name, names) {
  //names sera el arreglo
  return names.includes(name);
}

console.log(
  isNameIn("Juana", nombres) ? "Esta en la lista" : "No esta en la lista"
);
