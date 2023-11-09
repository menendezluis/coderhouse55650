class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  static especie = "Humano";
  saludar() {
    console.log(`Hola soy ${this.nombre}`);
  }
  getEspecie() {
    console.log(`La especie es ${Persona.especie}`);
  }
}

let persona1 = new Persona("Luis");
let persona2 = new Persona("Paola");
let persona3 = new Persona("Daniel");

persona1.saludar();
persona2.saludar();

persona3.getEspecie();
