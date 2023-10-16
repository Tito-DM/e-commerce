const { json } = require("body-parser");
const { elasticClient } = require("../helpers/elastic");
const user = require("../models/user");

//elastic config
const client = elasticClient();

exports.userSearch = async (req, res) => {

    const results = await user.search({
        query_string: {
          query: "john"
        }
      });
      res.status(200).json({results})
      console.log(results)
};