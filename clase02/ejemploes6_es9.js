const tiendas = [
  {
    manzanas: 3,
    peras: 2,
    carne: 3,
    jugos: 5,
    dulces: 2,
  },
  {
    manzanas: 1,
    sandias: 1,
    huevos: 8,
    jugos: 2,
    panes: 4,
  },
];

let productos = [];
let total = 0;
let newTemporal = 0;

tiendas.forEach((tienda) => {
  let temporal = 0;
  Object.keys(tienda).forEach((producto) => {
    temporal = temporal + tienda[producto];
    if (!productos.includes(producto)) {
      productos.push(producto);
    }
  });
  total = total + temporal;
  newTemporal =
    newTemporal +
    Object.values(tienda).reduce((acumulador, valorActual) => {
      return acumulador + valorActual;
    });
});

console.log(productos);
console.log("el total de productos es: " + total);
console.log("usando reducers:", newTemporal);
