//const fs = require("fs");
import fs from "fs";
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
    const data = await JSON.parse(result.toString());
    console.log(data);
    console.log(data.nombre);
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

export { createFile, readFile, updateFile, deleteFile };
