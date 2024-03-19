export const suma = (a, b) => a + b;
export const resta = (a, b) => a - b;
export const multiplicacion = (a, b) => a * b;
export const division = (a, b) => a / b;
export const potencia = (a, b) => a ** b;
export const raizCuadrada = (a) => Math.sqrt(a);
export const raizCubica = (a) => Math.cbrt(a);
export const raizN = (a, n) => a ** (1 / n);
export const multiplicacionPorPi = (a) => a * Math.PI;
export const whatDayIsToday = () => {
  const today = new Date();
  const options = { weekday: "long" };
  return today.toLocaleDateString("es-AR", options);
};
export const isEven = (a) => a % 2 === 0;

export default {
  suma,
  resta,
  multiplicacion,
  division,
  potencia,
  raizCuadrada,
  raizCubica,
  raizN,
  multiplicacionPorPi,
  whatDayIsToday,
  isEven,
};
