const winston = require("winston");
const { combine, timestamp, colorize, align, printf, splat } = winston.format;

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message}`;

  return msg;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize({ all: true }),
    splat(),
    timestamp({
      format: "DD-MM-YYYY hh:mm:ss.SSS A",
    }),
    align(),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
