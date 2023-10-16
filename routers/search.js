const { userSearch } = require("../controllers/seachController")
const authMiddleware = require("../middleware/auth")

const router = require("express").Router()

router.post("/search", userSearch)

module.exports = router