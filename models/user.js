const mongoose = require("mongoose");
const { elasticClient } = require("../helpers/elastic");
const mongoosastic = require("mongoosastic");
//elastic config
const client = elasticClient();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      es_indexed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      es_indexed: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAccountActive: {
      type: Boolean,
      default: false,
    },
    UserRole: {
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
      code: {
        type: String,
        unique: true,
        enum: [5849, 609],
        default: 5849,
      },
    },

    refreshToken: {
      type: [String],
      required: true,
    },
  },

  {
    timestamps: true,
  } /*optional field if you wnat to store date of record creation*/
);
//index mongodb to elastic
/*
UserSchema.plugin(mongoosastic, {
  esClient: client,
});
*/
module.exports = mongoose.model("User", UserSchema, "users");
