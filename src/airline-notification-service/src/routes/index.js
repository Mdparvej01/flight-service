const express = require("express");

const { EmailController } = require("../controllers");

const router = express.Router();

router.use("/tickets", EmailController.create);

module.exports = router;
