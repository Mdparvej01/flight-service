const express = require('express');

const {CityController} = require('../../controllers');
const {CityMiddelware} = require('../../middlewares')
const router = express.Router();
//  /api/v1/airplanes post
router.post('/' , CityMiddelware.validateCreateRequest ,  CityController.createCity);
router.delete('/:id',   CityController.destroyCity);
// router.get('/' , AirplaneController.getAirplanes);
// router.get('/:id' , AirplaneController.getAirplane);   //   /airplanes/:id
// router.delete('/:id' , AirplaneController.destroyAirplane);
module.exports = router;