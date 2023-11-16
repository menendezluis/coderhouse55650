const dividir = (dividendo, divisor) => {
  return new Promise((resolve, reject) => {
    if (divisor === 0) {
      reject("No se puede dividir por cero");
    }
    resolve(dividendo / divisor);
  });
};

//console.log(dividir(2, 0));
dividir(2, 0)
  .then((resultado) => {
    console.log(resultado);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// ejempllo usando async/await

async function ejecutarDivisionPromesa(valor1, valor2) {
  try {
    const respuesta = await dividir(valor1, valor2);
    console.log(
      "El resultado de la division es:",
      respuesta,
      "valores utilizados:",
      valor1,
      valor2
    );
  } catch (error) {
    console.log("Error:", error, "en la division de", valor1, "y", valor2);
  }
}

ejecutarDivisionPromesa(2, 0);
ejecutarDivisionPromesa(2, 1);
ejecutarDivisionPromesa(2, 2);
