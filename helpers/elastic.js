const { Client } = require("@elastic/elasticsearch");
const logger = require("./logger");

exports.elasticClient =  () => {
  try {
    const client =  new Client({
      node: "https://localhost:9200/",
    });
    logger.info("Elastic connection sucessfull");
    return client;

  } catch (error) {

    logger.info(`error connection to elastic search, ${error}`);
  }

};
