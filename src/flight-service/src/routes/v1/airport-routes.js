const express = require('express');

const {AirportController} = require('../../controllers');
const router = express.Router();
const {AirportMiddlewares} = require('../../middlewares')

router.post('/' ,
     AirportMiddlewares.validateCreateRequest, 
     AirportController.createAirport   );

router.get('/' ,
     AirportController.getAirports   );

router.get('/:id' ,
     AirportController.getAirport   );

router.delete('/:id' ,
     AirportController.destroyAirport   );

module.exports = router;