const fs = require("fs");
const FILE_NAME = "./otroArchivo.txt";

//si el archivo no existe, entonces writeFile lo crea, y si existe lo sobreescribe
//fs.writeFileSync(FILE_NAME, "Cambiamos el texto, Hola mundo");

//existe el archivo? existeSync valida si existe,y devuelve true o false
const existFile = fs.existsSync(FILE_NAME);
console.log("Existe el archivo?", existFile);

if (existFile) {
  //leamos el archivo con readFileSync
  let contenidoDelArchivo = fs.readFileSync(FILE_NAME, "utf-8");
  console.log(contenidoDelArchivo);
  //agregamos mas texto al archivo con appendFileSync
  fs.appendFileSync(FILE_NAME, "Agregamos mas texto");
  let masContenido = fs.readFileSync(FILE_NAME, "utf-8");
  console.log(masContenido);

  //eliminamos el archivo con unlinkSync
  fs.unlinkSync(FILE_NAME);
} else {
  console.log("El archivo no existe");
}
//fs.readFile
//fs.writeFile
//fs.appendFile
//fs.unlink
//fs.existsSync
