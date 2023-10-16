const mongoose = require("mongoose"); // to deal with the mongodb database
const logger = require("../helpers/logger");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASEURI,{
      dbName: "e-commerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("DataBase connection sucessfull");
  } catch (error) {
    logger.error(
      `msg: DataBase Connection Error\n error: ${error.message} at  ${__filename} `
    );
  }
};

module.exports = dbConnection;
