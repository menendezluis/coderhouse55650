const fs = require("fs");
const FILE_NAME = "./archivoConCallbacks.txt";

//const existsFile = fs.existsSync(FILE_NAME);

fs.writeFile(FILE_NAME, "Hola mundo", (error) => {
  if (error) console.log("Error al escribir el archivo", error);
  console.log("Archivo creado");

  //if (existsFile) {
  fs.readFile(FILE_NAME, "utf-8", (error, contenido) => {
    if (error) console.log("Error al leer el archivo", error);
    console.log("Contenido del archivo", contenido);

    fs.appendFile(FILE_NAME, "Agregamos mas texto", (error) => {
      if (error) console.log("Error al agregar mas texto", error);
      console.log("Agregamos mas texto");

      fs.readFile(FILE_NAME, "utf-8", (error, contenido) => {
        if (error) console.log("Error al leer el archivo", error);
        console.log("Contenido del archivo", contenido);

        fs.unlink(FILE_NAME, (error) => {
          if (error) console.log("Error al eliminar el archivo", error);
          console.log("Eliminamos el archivo");
        });
      });
    });
  });
  //}
});
