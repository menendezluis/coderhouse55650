/*let nombre = "Luis";
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
*/
let persona = {
  nombre: "Luis",
  apellido: "Menendez",
  nacionalidad: "Guatemalteco",
  edad: 34,
  genero: "Masculino",
  estadoCivil: "Soltero",
};

console.log(persona);
persona.edad++;
console.log(persona);
persona.profesion = "Programador";
persona.pasatiempos = ["Videojuegos", "Viajar", "Leer", "Cine"];
persona.stack = ["HTML", "CSS", "JavaScript", "React", "NodeJS"];
console.log(persona);

persona.stack.push("MongoDB");
console.log(persona["stack"][5]);
console.log(persona.stack.length);
console.log(persona.stack[persona.stack.length - 1]);
