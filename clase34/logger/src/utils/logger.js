import winston from "winston";
import dotenv from "dotenv";

dotenv.config();

const MODE = process.env.MODE || "dev";
console.log(MODE);
console.log(process.env.MODE);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({ filename: "./errors.log", level: "warn" }),
  ],
});
/*export const addLogger = (req, res, next) => {
  const textDate = new Date().toISOString();
  req.logger = logger;
  req.logger.http(`${req.method} - ${req.url} - ${textDate}`);
  next();
};
*/
///actividad

const checkEnvirontment = () => {
  if (MODE.toUpperCase() === "DEV") {
    console.log("aqui");
    return devLogger;
  }
  return prodLogger;
};

const devLogger = winston.createLogger({
  transports: [new winston.transports.Console({ level: "verbose" })],
});

const prodLogger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({
      filename: "./errorsActividad.log",
      level: "warn",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger = checkEnvirontment();
  const textDate = new Date().toISOString();
  req.logger.http(`${req.method} - ${req.url} - ${textDate}`);
  next();
};
