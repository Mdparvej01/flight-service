const {AirportRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data){

    try {

       const airport = await airportRepository.create(data);
       return airport;

    }catch(error){
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation , StatusCodes.BAD_REQUEST);
        }
        // console.log(error);
        throw new AppError('Cannot create a new airport object' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirport(id){
    
     try {

        const airport = await airportRepository.get(id);
        return airport;

     }catch(error){

        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('Airort you requested is not present..' , StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw new AppError('Cannot fetch data of  the airport' , StatusCodes.INTERNAL_SERVER_ERROR);
     }
}


async function destroyAirport(id){
    
    try {

       const airport = await airportRepository.destroy(id);
       return airport;

    }catch(error){

        // console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airort you requested to delete is not present..' , StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw new AppError('Cannot delete requested airport' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAirports(){
    
    try {

       const airports = await airportRepository.getAll();
       return airports;

    }catch(error){

        console.log(error);
        throw new AppError('Cannot fetch data of all the airports' , StatusCodes.INTERNAL_SERVER_ERROR)
    }
}



module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport
}

