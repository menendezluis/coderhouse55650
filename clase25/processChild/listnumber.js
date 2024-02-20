//import { Command } from "commander";

//const program = new Command();

//program.option("--list [numbers...]", "Lista de números");

//program.parse();

//const options = program.opts();/
//console.log(options.list);
const list = process.argv.slice(2);

let invalid = false;
let counter = 0;
let typeOfValues = list.map((value) => {
  if (isNaN(parseInt(value))) {
    if (value === "true" || value === "false") {
      return "boolean";
    } else if (value === "null") {
      return "null";
    } else {
      return typeof value;
    }
  } else {
    return typeof parseInt(value);
  }
});
for (let number of list) {
  if (isNaN(parseInt(number))) {
    invalid = true;
    console.log("Invalid parameter");
  }
}
//console.log(typeOfValues);
//console.log(invalid);
//console.log(4 / "b");

process.on("exit", (code) => {
  if (counter === 0) invalid && counter++;
  invalid &&
    counter <= 1 &&
    console.log(`Invalid parameter in the list ${typeOfValues}`);
});
