const mongoose = require("mongoose");
const logger = require("../startup/logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/course")
    .then(() => logger.error("Connected to MongoDB..."))
    .catch((err) => {
    //  logger.error("Could not connect to MongoDB...");
      logger.error(err.message);
     // process.exit(-1);
    });
};
