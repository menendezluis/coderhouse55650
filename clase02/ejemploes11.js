let variablePrueba = 0;

let variableAsignable = variablePrueba || 1;

let variableConNullish = variablePrueba ?? 1;
console.log(variableConNullish);

class Persona {
  #fullname;
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.#fullname = nombre + " " + apellido;
  }

  getfullname() {
    return this.#fullname;
  }

  #metodoPrivado() {
    console.log("Soy un metodo privado");
  }

  getMetodoPrivado() {
    this.#metodoPrivado();
  }
}

let nuevaPersona = new Persona("Luis", "Perez");
console.log(nuevaPersona.getfullname());
nuevaPersona.getMetodoPrivado();
