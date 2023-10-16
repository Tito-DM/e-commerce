const route = require("express").Router();
const {
  getAllProduct,
  getProduct,
  AddProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const Product = require("../models/products");
const paginationResults = require("../middleware/pagination");

route
  .get("/:user_id", paginationResults(Product), getAllProduct)
  .get("/:user_id/:product_id", getProduct)
  .post("/:user_id", AddProduct)
  .put("/:user_id/:product_id", updateProduct)
  .delete("/:user_id/:product_id", deleteProduct);

module.exports = route;
