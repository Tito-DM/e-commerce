const logger = require("../helpers/logger");
const userAuthenticity = require("../helpers/userAuthenticity");
const Order = require("../models/order");

exports.getAllOrder = async (req, res) => {
  try {
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id))
      return res.status(401).json({ msg: "authorization denied" });

    const order = await Order.find();

    logger.info(
      `msg: all order retrived successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "All Orders",
      order,
    });
  } catch (error) {
    logger.error(
      `msg: Error retriving all Order\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id))
      return res.status(401).json({ msg: "authorization denied" });

    const order = await Order.findById(req.params.order_id);

    logger.info(
      `msg: order retrived successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "Product",
      order,
    });
  } catch (error) {
    logger.error(
      `msg: Error canceling Order\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.AddOrder = async (req, res) => {
  // verify user authenticity
  // verify user authenticity
  if (!userAuthenticity(req.user_id, req.params.user_id))
    return res.status(401).json({ msg: "authorization denied" }); //check if product exist
  const order = await Order.findOne({ name: req.body.name });

  if (order)
    return res.status(409).json({
      msg: "Order already exists",
    });

  await Order.create(req.body)
    .then((data) => {
      logger.info(
        `msg: order created successfully\n  \n method: ${req.method}\n path: ${req.url}`
      );

      res.status(200).json({
        msg: "Order created successfully",
        data,
      });
    })
    .catch((error) => {
      logger.error(
        `msg: Error canceling Order\n error: ${error.message} at  ${__filename} `
      );
      res.status(500).json({
        msg: "Server Error",
        error: error.message,
      });
    });
};

exports.updateOrder = async (req, res) => {
  try {
    // verify user authenticity
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id))
      return res.status(401).json({ msg: "authorization denied" });
    const order = await Order.findByIdAndUpdate(req.params.order_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(401).json({
        msg: "Order not found",
        order,
      });
    }

    logger.info(
      `msg: order updated successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "Order updated successfully",
      order,
    });
  } catch (error) {
    logger.error(
      `msg: Error canceling Order\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    // verify user authenticity
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id))
      return res.status(401).json({ msg: "authorization denied" });

    const order = await Order.findByIdAndUpdate(
      req.params.order_id,
      { status: req.body.status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        msg: "order not found",
        order,
      });
    }
    logger.info(
      `msg: order cancel successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );
    res.status(200).json({
      msg: "order cancel successfully",
      order,
    });
  } catch (error) {
    logger.error(
      `msg: Error canceling Order\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    // verify user authenticity
    userAuthenticity(req.user_id, req.params.id, res);
    const order = await Order.findByIdAndDelete(req.params.order_id);

    if (!order) {
      return res.status(401).json({
        msg: "oder not found",
        order,
      });
    }

    logger.info(
      `msg: Order Deleted\n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "order cancel successfully",
    });
  } catch (error) {
    logger.error(
      `msg: Error deleting Order\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};
