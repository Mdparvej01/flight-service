const { FlightService } = require('../services');

const {StatusCodes } = require('http-status-codes');


async function createFlight (req,res) {

    console.log("flightNumber=>" , req.body.flightNumber);


    try {
        const flight = await FlightService.createFlight({
            flightNumber:req.body.flightNumber ,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,

            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
            

        });

        console.log(flight);

    
        return res.status(StatusCodes.CREATED)
                 .json({
                    success:true,
                    message:"Successfully created new flight",
                    data:flight,
                    error:{}
                 })

    } catch (error){
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json({
                success:false,
                message:"Something went wrong while creating flight :(",
                error
               })
        
    }
}

module.exports = {
    createFlight
}