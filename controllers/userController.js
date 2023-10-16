const { ACCOUNT_VERIFICATION_ROUTE } = require("../helpers/constants");
const { sendMail } = require("../helpers/emailConfirmation");
const logger = require("../helpers/logger");
const userAuthenticity = require("../helpers/userAuthenticity");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.updateUser = async (req, res) => {
  try {
    // verify user authenticity
    userAuthenticity(req.user_id, req.params.id, res);
    const { password, ...data } = req.body;

    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (user) {
      logger.info(
        `msg: User updated sucessfully \n  \n method: ${req.method}\n path: ${req.url}`
      );
      return res.status(200).json({
        msg: "User updated successfully",
        user,
      });
    }

    res.status(400).json({
      msg: "User not found",
    });
  } catch (error) {
    logger.error(
      `msg: Issue updating user account \n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error,
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    // verify user authenticity
    userAuthenticity(req.user_id, req.params.id, res);

    const user = await User.findById(id);

    logger.info(
      `msg: User retrieved sucessfully \n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "User",
      user,
    });
  } catch (error) {
    logger.error(
      `msg: Issue retrieving user \n error: ${error.message} at  ${__filename} `
    );

    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // verify user authenticity
    userAuthenticity(req.user_id, req.params.id, res);

    await User.findByIdAndDelete(req.params.id);

    logger.info(
      `msg: User deleted sucessfully \n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    logger.error(
      `msg: Issue deleting user Account\n error: ${error.message} at  ${__filename} `
    );
    res.status(500).json({
      msg: error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    // verify user authenticity
    userAuthenticity(req.user_id, req.params.id, res);

    logger.info(
      `msg: Users retrieved sucessfully \n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "All Users",
      users,
    });
  } catch (error) {
    logger.error(
      `msg: Issue activating user Account\n error: ${error.message} at  ${__filename} `
    );

    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.activateAccount = async (req, res) => {
  const { id, isactive } = req.params;

  try {
    if (isactive) {
      const user = await User.findByIdAndUpdate(
        id,
        { isAccountActive: true },
        {
          new: true,
          runValidators: true,
        }
      );

      logger.info(
        `msg: Account sucessfully activated \n  \n method: ${req.method}\n path: ${req.url}`
      );

      res.status(200).json({
        msg: "Account sucessfully activated",
        user,
      });
    }
  } catch (error) {
    logger.error(
      `msg: Issue activating user Account\n error: ${error.message} at  ${__filename} `
    );

    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.passswordResetEmailSender = async (req, res) => {
  //send password rest link
  console.log(req.user_id);
  const currentUser = await User.findById(req.user_id).select("-password");

  try {
    await sendMail(
      currentUser.email,
      "password reset",
      "clinck the link to reset password",
      currentUser.id,
      res,
      ACCOUNT_VERIFICATION_ROUTE
    );

    logger.info(
      `msg: password reset link sent successfully \n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "password reset link sent successfully",
    });
  } catch (error) {
    logger.error(
      `msg: Issue sending Password reseting email\n error: ${error.message} at  ${__filename} `
    );

    res.status(500).json({
      error: error.message,
    });
  }
};
exports.passswordReset = async (req, res) => {
  const currentUser = await User.findById(req.user_id);

  const { old_password, newpassword } = req.body;

  //check old password match

  const isMatch = await bcrypt.compare(old_password, currentUser.password);

  if (!isMatch)
    return res.status(401).json({
      msg: "password do not match",
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newpassword, salt);

  try {
    const user = await User.findOneAndUpdate(
      { _id: currentUser.id },
      { $set: { password: hashPassword } },
      { new: true, runValidators: true }
    ).select("-password");

    logger.info(
      `msg: User Pasword reset successfully \n  \n method: ${req.method}\n path: ${req.url}`
    );

    res.status(200).json({
      msg: "password reset successfully",
      user,
    });
  } catch (error) {
    logger.error(
      `msg: Issue reseting Password\n error: ${error.message} at  ${__filename} `
    );

    res.status(500).json({
      msg: "An error occured",
      error,
    });
  }
};

exports.logOunt = async (req, res) => {
  const cookies = req.cookies;

  if(!cookies?.jwt) return res.sendStatus(401)

  const refreshToken = cookies.jwt;

  const user = await User.findOne({refreshToken})

  if(!user) return res.status(404).json({msg: "user not found"})

  const newRefreshTokenArray = user.refreshToken.filter(rt => rt !== refreshToken)

  
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({
    msg: "logged out successfully",
  });
};
