const logger = require("../helpers/logger");
const userAuthenticity = require("../helpers/userAuthenticity");
const Product = require("../models/products");
const User = require("../models/user");

exports.getAllProduct = async (req, res) => {
  try {
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id)) {
      return res.status(401).json({ msg: "authorization denied" });
    }
    logger.info(
      `msg: Products  retrived successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );
    res.status(200).json(res.paginationResults);
  } catch (error) {
    logger.error(
      `msg: Issue retreiving all Product\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    // verify user authenticity
    if (!userAuthenticity(req.user_id, req.params.user_id))
      return res.status(401).json({ msg: "authorization denied" });
    const product = await Product.findById(req.params.product_id);

    logger.info(
      `msg: Product  retrived successfully\n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "Product",
      product,
    });
  } catch (error) {
    logger.error(
      `msg: Issue geting Product\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.AddProduct = async (req, res) => {
  //check if product exist
  // verify user authenticity
  if (!userAuthenticity(req.user_id, req.params.user_id))
    return res.status(401).json({ msg: "authorization denied" });

  const product = await Product.findOne({ name: req.body.name });
  const currentUser = await User.findById(req.user_id);

  if (product)
    return res.status(409).json({
      msg: "product already exists",
    });

  if (currentUser.isAdmin) {
    await Product.create(req.body)
      .then((data) => {
        logger.info(
          `msg: Product  added successfully\n  \n method: ${req.method}\n path: ${req.url}`
        );

        res.status(200).json({
          msg: "Product created successfully",
          data,
        });
      })
      .catch((error) => {
        logger.error(
          `msg: Issue adding Product\n error: ${error.message} at  ${__filename} `
        );
        res.status(500).json({
          msg: "Server Error",
          error: error.message,
        });
      });
  } else {
    res.status(401).json({
      msg: "You are not authorized to add product",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user_id);

    if (currentUser.isAdmin) {
      const product = await Product.findByIdAndUpdate(
        req.params.product_id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!product)
        return res.status(400).json({
          msg: "Product not found",
        });
      logger.info(
        `msg: Product  updated successfully\n  \n method: ${req.method}\n path: ${req.url}`
      );
      res.status(200).json({
        msg: "Product updated successfully",
        product,
      });
    } else {
      logger.warn(`unAuthorized user trying to update a product`);
      res.status(401).json({
        msg: "You are not authorized to update product",
      });
    }
  } catch (error) {
    logger.error(
      `msg: Issue updating Product\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user_id);
    if (currentUser.isAdmin) {
      const product = await Product.findByIdAndDelete(req.params.product_id);

      if (!product)
        return res.status(400).json({
          msg: "Product not found",
        });
      logger.info(
        `msg: Product  deleted successfully\n  \n method: ${req.method}\n path: ${req.url}`
      );
      res.status(200).json({
        msg: "Product deleted successfully",
      });
    } else {
      logger.warn(`unAuthorized user trying to update a product`);
      res.status(401).json({
        msg: "You are not authorized to update product",
      });
      res.status(401).json({
        msg: "You are not authorized to delete product",
      });
    }
  } catch (error) {
    logger.error(
      `msg: Issue deleting Product\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error.message,
    });
  }
};
