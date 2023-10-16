const router = require("express").Router();
const { paymentMethod } = require("../controllers/paymentMethodController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, paymentMethod);

module.exports = router;
