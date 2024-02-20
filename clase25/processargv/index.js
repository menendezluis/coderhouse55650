//import config from "./3ENV.js";
import express from "express";
import Config from "./config.js";
import { Command } from "commander";

const program = new Command();

program.option("--mode <mode>", "Modo de ejecución", "production");
//console.log(config);
program.parse();

const options = program.opts();

const app = express();

const environment = options.mode.toUpperCase();
const config = Config(environment);
//console.log(config);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT} in ${environment} mode`);
});
