const router = require("express").Router();
const {
  signUpController,
  loginController,
} = require("../controllers/authController");

router.post("/signup", signUpController);
router.post("/login", loginController);

module.exports= router