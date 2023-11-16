let objeto1 = {
  propiedad1: "el mismo valor",
  propiedad2: "b",
  propiedad3: true,
};

let objeto2 = {
  propiedad1: "c",
  propiedad2: [2, 3, 4, 5, 6, 7],
};
let { propiedad1 } = objeto1;
/*onsole.log("propiedad 1", propiedad1);
console.log("objeto1 y propiedad 1", objeto1.propiedad1);
*/
let objeto3 = {
  ...objeto1,
  ...objeto2,
};

console.log(objeto3);

let objeto4 = {
  a: 1,
  b: 2,
  c: 3,
};
let { a, ...cualquiernombre } = objeto4;

console.log(cualquiernombre);
