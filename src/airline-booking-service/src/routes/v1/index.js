const express = require("express");

const { InfoController } = require("../../controllers");

const bookingRoutes = require("./booking-routes");

const router = express.Router();

router.use("/bookings", bookingRoutes);
router.use("/bookings/payment", bookingRoutes);

module.exports = router;
