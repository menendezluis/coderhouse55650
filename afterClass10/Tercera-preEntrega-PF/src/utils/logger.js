import winston from "winston";

//const isDev = process.env.NODE_ENV !== "production";
const logger =
  // isDev ?
  winston.createLogger({
    transports: [
      new winston.transports.Console({ level: "debug" }),
      new winston.transports.File({ filename: "./errors.log", level: "warn" }),
    ],
  });
//  : winston.createLogger..........

export const addLoggers = (req, res, next) => {
  const textDate = new Date().toISOString();
  req.logger = logger;
  req.logger.http(`${req.method} en ${req.url} - ${textDate}`);
  next();
};

export default logger;
