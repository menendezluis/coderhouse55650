class nombredeMiClase {
  constructor(parametrosDeInicializacion) {
    console.log("nueva instancia de la clase / objeto");
    this.variableInterna = 5;
  }

  static variableEstatica = 8;

  metodo1() {
    console.log("Hola mundo");
  }
  metodo2() {
    console.log(`Hola mundo ${this.variableInterna}`);
  }
}

let instancia = new nombredeMiClase();

console.log(instancia.variableInterna); //8
instancia.metodo1();
instancia.metodo2();

let instanciaDos = new nombredeMiClase();

let instanciaTres = new nombredeMiClase();
