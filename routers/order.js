const router = require("express").Router();
const {
  getAllOrder,
  getOrder,
  deleteOrder,
  updateOrder,
  AddOrder,
  cancelOrder,
} = require("../controllers/orderController");
const paginationResults = require("../middleware/pagination");
const Order = require("../models/order");

router
  .get("/:user_id", paginationResults(Order), getAllOrder)
  .get("/:user_id/:order_id", getOrder)
  .post("/:user_id", AddOrder)
  .put("/:user_id/:order_id", updateOrder)
  .put("/cancel/:user_id/:order_id", cancelOrder)

  .delete("/:user_id/:order_id", deleteOrder);

module.exports = router;
