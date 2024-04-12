import winston from "winston";

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },

  colors: {
    fatal: "red",
    error: "orange",
    warn: "yellow",
    info: "blue",
    http: "green",
    debug: "purple",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelOptions.levels,

  transports: [
    new winston.transports.Console({
      level: "info",

      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),

    new winston.transports.File({
      filename: "./erros.log",
      level: "error",
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelOptions.levels,

  transports: [
    new winston.transports.Console({
      level: "debug",

      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  req.logger =
    process.env.ENVIRONMENT === "production" ? prodLogger : devLogger;

  req.logger.http(
    `${req.method} en ${req.url} - ${new Date().toLocaleString()}`
  );

  next();
};
