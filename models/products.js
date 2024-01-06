const mongoose = require("mongoose");
const { elasticClient } = require("../helpers/elastic");
const mongoosastic = require('mongoosastic')
//elastic config
//elastic config
const client = elasticClient();




const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Price must be a positive number");
        }
      },
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    size: [
      {
        sz: {
          type: String,
          required: true,
          trim: true,
        },
        qty: {
          type: Number,
          default: 0,
          validate(value) {
            if (value < 0) {
              throw new Error("Stock must be a positive number");
            }
          },
        },
      },
    ],
    color: [
      {
        clr: {
          type: String,
          required: true,
          trim: true,
        },
        qty: {
          type: Number,
          default: 0,
          validate(value) {
            if (value < 0) {
              throw new Error("Stock must be a positive number");
            }
          },
        },
      },
    ],

    countInStock: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Stock must be a positive number");
        }
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//index mongodb to elastic
productSchema.plugin(mongoosastic);

module.exports = mongoose.model("Product", productSchema);
