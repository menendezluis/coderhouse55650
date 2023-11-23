const fs = require("fs");
const FILE_NAME = "./archivoConPromesas.txt";

const operacionasAsincronas = async () => {
  await fs.promises.writeFile(FILE_NAME, "Hola esta es una promesa");
  await fs.promises.appendFile(
    FILE_NAME,
    `\nAgregamos mas texto ${new Date()}`
  );

  const contenido = await fs.promises.readFile(FILE_NAME, "utf-8");
  console.log("Contenido del archivo", contenido);

  //await fs.promises.unlink(FILE_NAME);
  console.log("Eliminamos el archivo");
};

operacionasAsincronas();
