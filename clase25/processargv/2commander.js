import { Command } from "commander";

const program = new Command();

program.option("--mode <mode>", "Modo de ejecución", "production");
/*program
  .option("-d, --debug", "Variable de debug")
  .option("-p <port>", "puerto del servidor", 8080)
  .option("--mode <mode>", "Modo de ejecución", "production")
  .requiredOption(
    "-u <user>",
    "Usuario del aplicativo",
    "No se ha ingresado usuario"
  )
  .option("-l, --letters [letters...]", "Especifique las letras");
*/
program.parse();

const options = program.opts();
console.log(options);
console.log("Remaining arguments: ", program.args);
