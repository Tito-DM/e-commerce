const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");
const { elasticClient } = require("../helpers/elastic");

//elastic config
const client = elasticClient();

const reviewSchema = new mongoose.Schema({
  reviews: [
    {
      rating: {
        //nm«um of rating
        type: Number,
        required: true,
        validate(value) {
          if (value < 0) {
            throw new Error("Rating must be a positive number");
          }
        },
      },
      comment: {
        //num review will be based in comment
        type: String,
        required: true,
        trim: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
      },
    },
  ],
});
reviewSchema.plugin(mongoosastic,{
  esClient: client
} );

module.exports = mongoose.model("Review", reviewSchema);
