import fs, { read } from "fs";
import { createFile, readFile, updateFile, deleteFile } from "./helpers.js";

const FILE_NAME = "./ejemploJson.txt";

const persona = {
  nombre: "",
  apellido: "",
  edad: 0,
};

const existFile = fs.existsSync("./archivo.txt");

if (!existFile) {
  persona.nombre = "Juan";
  persona.apellido = "Perez";
  persona.edad = 30;
  createFile(JSON.stringify(persona), FILE_NAME);
  readFile(FILE_NAME);
}

console.log("Existe el archivo", existFile);
