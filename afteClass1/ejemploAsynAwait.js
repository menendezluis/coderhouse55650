const timer = (segundos) => {
  return new Promise((resolve, reject) => {
    console.log("Inicamos contador de " + segundos + " segundos");
    setTimeout(() => {
      if (isNaN(segundos)) {
        reject("solo se permiten numeros enteros");
      } else {
        resolve("Tiempo cumplido");
      }
    }, segundos * 1000);
  });
};
async function executeTimer() {
  try {
    let result = await timer(10);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
executeTimer(10);
