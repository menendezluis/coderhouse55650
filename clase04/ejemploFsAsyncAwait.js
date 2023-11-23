const fs = require("fs");
const FILE_NAME = "./archivoFileSync.txt";

async function createFile(text, filename) {
  try {
    await fs.promises.writeFile(filename ?? FILE_NAME, text ?? "Hola mundo");
  } catch (error) {
    console.log("Error al crear el archivo", error);
  }
}

async function readFile(filename) {
  try {
    const result = await fs.promises.readFile(filename ?? FILE_NAME);
    //return result.toString();
    console.log(result.toString());
  } catch (error) {
    console.log("Error al crear el archivo", error);
  }
}

async function updateFile(text, filename) {
  try {
    await fs.promises.appendFile(filename ?? FILE_NAME, text ?? "Hola mundo");
  } catch (error) {
    console.log("Error al crear el archivo", error);
  }
}

async function deleteFile(filename) {
  try {
    await fs.promises.unlink(filename ?? FILE_NAME);
  } catch (error) {
    console.log("Error al crear el archivo", error);
  }
}

//createFile("Hola mundo async", "./archivoAsync.txt");
//createFile("Hola mundo async sin pasar el nombre del archivo");
//readFile("./archivoAsync.txt");
//readFile();
//updateFile("./archivoAsync.txt", "Agregamos mas texto");
//readFile("./archivoAsync.txt");

//updateFile("!!!!!!!!!!!!!!!!!!!! sin pasar el nombre del archivo");
//readFile();

deleteFile("./archivoAsync.txt");
deleteFile();
