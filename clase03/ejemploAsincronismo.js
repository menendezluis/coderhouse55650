const escribirArchivo = require("./escribirArchivo.js");

const respuesta = async function ejecutarLlamada() {
  try {
    //const respuesta = await fetch("https://rickandmortyapi.com/api/character");

    const respuesta = await fetch(
      "https://rickandmortyapi.com/api/character/1"
    );
    const data = await respuesta.json();
    console.log(data.name);
  } catch (error) {
    console.log("Error: ", error);
  }
};

async function otraFuncionAsincrona() {
  try {
    //const respuesta = await fetch("https://rickandmortyapi.com/api/character");

    const respuesta = await fetch(
      "https://rickandmortyapi.com/api/character/2"
    );
    const data = await respuesta.json();
    console.log(data.name);
  } catch (error) {
    console.log("Error: ", error);
  }
}

respuesta();
otraFuncionAsincrona();
