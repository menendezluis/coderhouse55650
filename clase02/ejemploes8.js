let estudianteUno = {
  nombre: "Luis",
  apellido: "Perez",
  edad: 25,
  materias: ["Matematica", "Fisica", "Quimica"],
  getNombreCompleto: function () {
    return `${this.nombre} ${this.apellido}`;
  },
  getMaterias: function () {
    this.materias.forEach((materia) => {
      console.log(materia);
    });
  },
};

estudianteUno.nombre = "Kevin";
estudianteUno["nombre"] = "Luis";

let obteniendoLaLlaves = Object.keys(estudianteUno);
/*
console.log(obteniendoLaLlaves);
console.log(estudianteUno.nombre);
console.log(estudianteUno.apellido);
console.log(estudianteUno.edad);
console.log(estudianteUno.materias);
console.log(estudianteUno.getNombreCompleto());
console.log(estudianteUno.getMaterias());
*/
/*
Object.keys(estudianteUno).forEach((llave) => {
  console.log(estudianteUno[llave]);
});
*/
//console.log(Object.entries(estudianteUno));
let name;
let lastname;
Object.entries(estudianteUno).forEach((llaveValor) => {
  if (llaveValor[0] == "nombre") {
    name = llaveValor[1];
  }
  if (llaveValor[0] == "apellido") {
    lastname = llaveValor[1];
  }
});
console.log(name + " " + lastname);
