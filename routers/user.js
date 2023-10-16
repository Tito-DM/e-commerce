const router = require("express").Router();

const {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
  activateAccount,
  passswordResetEmailSender,
  passswordReset,
} = require("../controllers/userController");

router
  .get("/", getAllUsers)
  .get("/verify/:id/:isactive", activateAccount)
  .get("/password-reset-verification", passswordResetEmailSender)
  .put("/password-reset/:id", passswordReset)
  .get("/:id", getUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser);

module.exports = router;
