const {AirplaneRepository} = require('../repositories');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){

    try {

       const airplane = await airplaneRepository.create(data);
       return airplane;

    }catch(error){
        
        console.log(error);
        throw error;
    }
}

// get ...

async function getAirplanes(data){

    try {

       const airplane = await airplaneRepository.getAll();
       return airplane;

    }catch(error){
        
        throw error;
    }
}

module.exports = {
    createAirplane,
    getAirplanes
}

