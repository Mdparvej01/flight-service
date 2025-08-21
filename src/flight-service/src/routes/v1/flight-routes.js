const express = require("express");

const { FlightController } = require("../../controllers");
const router = express.Router();

const { FlightMiddleware } = require("../../middlewares");

router.post(
  "/",
  FlightMiddleware.validateCreateRequest,
  FlightController.createFlight
);

router.get("/", FlightController.getAllFlights);

router.get("/:id", FlightController.getFlight);

router.patch("/:id/seats", FlightController.updateSeats);

module.exports = router;
