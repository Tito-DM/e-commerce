const Review = require("../models/review");

exports.getAllReview = async (req, res) => {
  try {
    const review = await Review.find();
    res.status(200).json({
      msg: "All Review",
      review,
    });
  } catch (error) {
    console.log("internal server Error", error);
    res.status(500).json({
      msg: error,
    });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    res.status(200).json({
      msg: "Review",
      review,
    });
  } catch (error) {
    console.log("internal server Error", error);
    res.status(500).json({
      msg: error,
    });
  }
};

exports.addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(200).json({
      msg: "Review created successfully",
      review,
    });
  } catch (error) {
    console.log("internal server Error", error);
    res.status(500).json({
      msg: error,
    });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updatedreview = await Review.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json({
      msg: "review updated successfully",
      updatedreview,
    });
  } catch (err) {
    console.log("internal server Error", error);
    res.status(500).json({
      msg: error,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "Review deleted successfully",
      review,
    });
  } catch (error) {
    console.log("internal server Error", error);
    res.status(500).json({
      msg: error,
    });
  }
};
