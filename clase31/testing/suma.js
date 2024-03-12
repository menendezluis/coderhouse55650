const errors = {
  notNumber: "Alguno de los parametros no es un numero",
  notDefined: "Alguno de los parametros no esta definido",
  isNotFifteen: "El resultado es 15",
};

const printError = (error) => {
  console.log(error);
};
const isNumber = (...datos) => {
  let result = true;
  datos.forEach((dato) => {
    if (typeof dato !== "number") result = false;
  });
  return result;
};
const isUndefined = (...datos) => {
  let result = true;
  let length = datos.length;
  for (let i = 0; i < length; i++) {
    if (typeof datos[i] === "undefined") result = false;
  }
};

const summarize = (...args) => {
  let total = 0;
  let length = args.length;
  if (length === 0) {
    return null;
  }

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== "number") {
      return null;
    }
    total += args[i];
  }
  return total;
};
const suma = (...datos) => {
  if (isNumber(datos)) {
    printError(errors.notNumber);

    return null;
  }
  if (isUndefined(datos)) {
    printError(errors.notDefined);
    return null;
  }

  const result = summarize(...datos);

  if (result === 15) {
    printError(errors.isNotFifteen);
  }

  return result;
};
// la funcion debe devolver null si algun parametro no es un numero
console.log(suma(2, 3)); // 5
console.log(suma(2, "3")); // null
console.log(suma(2)); // null
console.log(suma()); // null
console.log(suma(12, 2));
console.log(suma(10, 2, 1, 2));
