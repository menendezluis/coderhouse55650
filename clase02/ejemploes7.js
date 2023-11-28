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

//? el signo de interregocion se lee si esto es true   isNameIn("Juana", nombres)
//entonces hace esto return "Esta en la lista"
// si noes true, returna "No esta en la lista"

if (isNameIn("Luis", nombres)) {
  console.log("Esta en la lista");
} else {
  console.log("No esta en la lista");
}
