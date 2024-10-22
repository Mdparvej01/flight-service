const express = require('express');

const {FlightController} = require('../../controllers');
// const {CityMiddelware} = require('../../middlewares')
const router = express.Router();

const {FlightMiddleware} = require('../../middlewares')
//  /api/v1/airplanes post
router.post('/' , FlightMiddleware.validateCreateRequest ,   FlightController.createFlight);


//get all flights with filter ...
router.get('/' ,   FlightController.getAllFlights);


// router.delete('/:id',   CityController.destroyCity);
// router.get('/' , AirplaneController.getAirplanes);
// router.get('/:id' , AirplaneController.getAirplane);   //   /airplanes/:id
// router.delete('/:id' , AirplaneController.destroyAirplane);
module.exports = router;        