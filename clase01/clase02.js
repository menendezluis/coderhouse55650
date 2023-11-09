/****************LET ************** */
let i = 0;

function miPrimeraFuncion() {
  i = i + 1;
  let j = 2;
  if (true) {
    console.log(j);
    console.log(i);
  }
}

function miPrimeraFuncionConReturn() {
  i = i + 1;
  let j = 2;
  if (true) {
    return {
      j,
      i,
    };
  }
}
//alcance
//console.log(j)
//miPrimeraFuncion();
//console.log(miPrimeraFuncionConReturn().i);
//console.log(miPrimeraFuncionConReturn().j);
/****************CONST ************** */
/*
const nombre = "Luis";
const VALOR_GANANCIA = 0.4;
//nombre = "Daniel";

let valorVenta = 999;
function calcular01() {
  return valorVenta * 0.4;
}

function impuesto01() {
  return valorVenta * 0.4;
}
function impuesto02() {
  return valorVenta * 0.4;
}

const producto = {
  name: "Pelota",
  precio: 100,
};

const mascota = {
  name: "Firulais",
  edad: 2,
};



producto.name = "Balon";
producto.propietario = "Messi";

console.log(typeof producto.precio);
console.log(typeof producto.name);
console.log(typeof producto);

producto = new Date();



const predioVehiculos = {
  nombre: "El mejor vehiculo aqui",
  listaVehiculos: [
    {
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2019,
    },
    {
      marca: "Honda",
      modelo: "Civic",
      anio: 2018,
    },
    {
      marca: "Nissan",
      modelo: "Sentra",
      anio: 2017,
    },
  ],
};

predioVehiculos.listaVehiculos.push({
  marca: "Mazda",
  modelo: "3",
  anio: 2016,
});

predioVehiculos.listaVehiculos[0].precio = 10000;
predioVehiculos.listaVehiculos[1].precio = 14000;
predioVehiculos.listaVehiculos[2].precio = 11000;
predioVehiculos.listaVehiculos[3].precio = 9000;

console.log(predioVehiculos);
*/

/********* FUNCIONES ************ */
/*
function saludar() {
  console.log("Hola mundo normal");
}

const saludarFlecha = () => {
  console.log("Hola mundo flecha");
};

const sumar = (a, b) => {
  return a + b;
};

function restar(a, b) {
  return a - b;
}
saludar();
saludarFlecha();

function saludoEspecial(nombre) {
  let hora = new Date().getHours();

  if (hora < 12) {
    console.log(`Buenos dias ${nombre}`);
  } else {
    console.log(`Buenas tardes ${nombre}`);
  }
}


console.log(sumar(5, 6));
console.log(restar(6, 5));

//saludoEspecial("Luis");
let variable;

saludoEspecialFlecha("Luis", 10);
saludoEspecialFlecha("Luis", 18);

const multiplicar = (a, b) => a * b;
console.log(multiplicar(5, 6));

const ejemploScope = () => {
  variable = "algo";
};
ejemploScope();
console.log(variable);



/********* TEMPLATE STRING ************ */
/*
function saludoEspecial() {
  let hora = new Date().getHours();

  if (hora < 12) {
    return `Buenos dias `;
  } else {
    return `Buenas tardes `;
  }
}

let nombre = "Luis";
let apellido = "Menendez";
let descripcion = `${saludoEspecial()} Mi nombre es ${nombre} ${apellido}`;

console.log(descripcion);

*/

/********* Hands on lab ************ */
/*
function saludoEspecial() {
  let hora = new Date().getHours();

  if (hora < 12) {
    return `Buenos dias `;
  } else {
    return `Buenas tardes `;
  }
}

let alumnos = [
  "Daniel Santilli",
  "Francisco Kavcic",
  "Agustin Picco",
  "Tomas Bareiro",
  "Santiago Lopez",
];

function mostrarList(estudiantes) {
  if (estudiantes.length === 0) {
    console.log("Lista Vacia");
  } else {
    for (let x = 0; x < estudiantes.length; x++) {
      let descripcion = `${saludoEspecial()} ${
        estudiantes[x]
      }, que bueno tenerte en clase!`;
      console.log(descripcion);
    }
  }
  console.log("La longitud es", estudiantes.length);
}
let alumnos2 = [];
mostrarList(alumnos2);

*/

/********* Clousures ************ */
console.log(saludo);
var saludo = "Hola mundo ";
console.log(saludo);
