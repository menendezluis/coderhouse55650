let nombre = "Luis";
let apellido = "Menendez";
let precio = "9.99";
let series = [
  "The Walking Dead",
  "One Piece",
  "House M.D.",
  "Breaking Bad",
  "Vikings",
  "Game of Thrones",
];

let peliculas = [
  "Avatar",
  "Interstellar",
  "Esperando la carroza",
  "El Padrino",
  "Juego de Gemelas",
  "La isla siniestra",
];

let diasSemana = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

function valorRandom(arreglo) {
  return arreglo[Math.floor(Math.random() * arreglo.length)];
}
console.log(nombre + " " + apellido);
//console.log(series[Math.floor(Math.random() * series.length)]);
//console.log(peliculas[Math.floor(Math.random() * peliculas.length)]);
//console.log(diasSemana[Math.floor(Math.random() * diasSemana.length)]);
console.log(valorRandom(diasSemana));
console.log(valorRandom(series));
console.log(valorRandom(peliculas));
