let modo = "calculos";

async function ejemploImportDynamico() {
  if ((modo = "calculos")) {
    const { default: Calculadora } = await import("./calculadora.js");
    let calculadora = new Calculadora();

    console.log(calculadora.sumar(2, 3));
    console.log(calculadora.restar(2, 3));
  }
}

ejemploImportDynamico();
