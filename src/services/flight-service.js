const {FlightRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const {Op} = require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data){

    try {

       const flight = await flightRepository.create(data);
       return flight;

    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        // console.log(error);
        throw new AppError('Cannot create a new flight object' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// filter Logic....

async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = "23:59:00";
    // trips = MUM-DEL
    if(query.trips){
       [ departureAirportId , arrivalAirportId ] = query.trips.split("-");
       customFilter.departureAirportId = departureAirportId;
       customFilter.arrivalAirportId=arrivalAirportId;
       
       // add check both must not same ...hw..
    }

    if(query.price){
        [minPrice , maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]:[minPrice,maxPrice]
        }

    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]:query.travellers  // tatal seatc = available seats ..
        }
    }

    // date time filter ..
    if(query.tripDate){
        customFilter.departureTime   = {
            [Op.between]:[query.tripDate  , query.tripDate + endingTripTime ]       // >= gte  , == eq  no time only date
        }
    }

    //

    if(query.sort){
       const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
        console.log("sortFilter-> ",sortFilter);
    }



    //

    try {

        const flights = await flightRepository.getAllFlights(customFilter , sortFilter);

        return flights;

    } catch(error){

        throw new AppError('Cannot fetch data of all the flights ' , StatusCodes.INTERNAL_SERVER_ERROR)

    }


}



async function getFlight(id){
    
    try {

       const flight = await flightRepository.get(id);
    //    console.log("id=>" , id , flight);
       return flight; 

    }catch(error){

       if(error.statusCode == StatusCodes.NOT_FOUND){
           throw new AppError('Flight you requested is not present..' , StatusCodes.INTERNAL_SERVER_ERROR);
       }

       throw new AppError('Cannot fetch data of  the Flight' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats,data.dec);
        return response;

    } catch(error){
        console.log(error);
        throw new AppError('Cannot UPDATE data of  the flight ' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats

}

