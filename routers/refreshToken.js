const { refreshTokkenController } = require("../controllers/refreshTokenController");

const router = require("express").Router();


router.get("/",refreshTokkenController)

module.exports = router;