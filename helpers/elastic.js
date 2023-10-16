const { Client } = require("@elastic/elasticsearch");

exports.elasticClient =  () => {
  try {
    const client =  new Client({
      node: "https://localhost:9200/",
      auth:{
        username: process.env.elasticUser,
        password: process.env.elasticPassword
      }
    });
    return client;
  } catch (error) {
    console.log("note connected")
  }

};
