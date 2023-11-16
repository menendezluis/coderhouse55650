function isNotZero(a, b) {
  if (a === 0 || b === 0) return true;
  else return false;
}

const suma = (a, b) => {
  return new Promise((resolve, reject) => {
    if (isNotZero(a, b)) {
      reject("suma: Operacion innecesaria");
    } else if (a + b < 0) {
      reject("Solo devolvemos positivos");
    } else {
      resolve(a + b);
    }
  });
};

const resta = (a, b) => {
  return new Promise((resolve, reject) => {
    if (isNotZero(a, b)) {
      reject("  resta : Operacion innecesaria");
    } else if (a - b <= 0) {
      reject("resta: Solo devolvemos positivos");
    } else {
      resolve(a - b);
    }
  });
};

const multiplicacion = (a, b) => {
  return new Promise((resolve, reject) => {
    if (a < 0 || b < 0) {
      reject("A y b deben de ser positivos");
    } else {
      resolve(a * b);
    }
  });
};

async function operacionesMatematicas(valor1, valor2) {
  try {
    const respuestaSuma = await suma(valor1, valor2);
    console.log("suma:", respuestaSuma);
    const respuestaResta = await resta(valor1, valor2);
    console.log("resta:", respuestaResta);
    const respuestaMulti = await multiplicacion(valor1, valor2);
    console.log("multiplicacion:", respuestaMulti);
  } catch (error) {
    console.log("Error:", error);
  }
}

operacionesMatematicas(2, 2);
operacionesMatematicas(2, 1);
operacionesMatematicas(2, 0);
