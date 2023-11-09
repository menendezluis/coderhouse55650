class contador {
  constructor(nombre) {
    this.nombre = nombre;
    this.valor = 0;
    contador.contadorGlobal++;
  }

  static contadorGlobal = 0;
  static nacionalidad = "Argentina";

  incrementar() {
    this.valor++;
  }

  obtenerValor() {
    return this.valor;
  }
  static obtenerContadorGlobal() {
    return contador.contadorGlobal;
  }

  getResponsable() {
    return this.nombre;
  }
}

let contador1 = new contador("Luis");
contador1.incrementar();
contador1.incrementar();
contador1.incrementar();
contador1.incrementar();
contador1.incrementar();
let contadorDos = new contador("Kevin");
contadorDos.incrementar();

console.log(contador1.obtenerValor());
console.log(contador.obtenerContadorGlobal());
console.log(contadorDos.obtenerValor());
