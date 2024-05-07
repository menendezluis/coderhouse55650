import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "http" }),
    new winston.transports.File({
      filename: "./errorsPractic.log",
      level: "warn",
    }),
  ],
});

export const addLogger = (req, res, next) => {
  const textDate = new Date().toISOString();
  req.logger = logger;
  const time = new Date().toLocaleString();
  req.logger.http(`${req.method} en ${req.url} - ${textDate} - ${time}`);
  next();
};
