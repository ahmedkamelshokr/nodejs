const winston = require("winston");
require("express-async-errors"); // make the app not crash and return error message

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: "combined.log",
    }),
    new winston.transports.Console({ colorize: true }),
  ],
});

//event emitter to be raised in case of uncaught exceptions
// it handles also promise rejection
process.on("uncaughtException", (ex) => {
  console.log("uncaughtException");
  console.log(ex.message);
});

process.on("unhandledRejection", (ex) => {
  console.log("unhandledRejection");
  console.log(ex.message);
});

//uncaughtException
//throw new Error("test");

// promise rejection
//const p = Promise.reject(new Error("promise rejection"));
//p.then(() => console.log("promise done"));

module.exports = logger;
