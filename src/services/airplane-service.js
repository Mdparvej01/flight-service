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


async function getAirplanes(){
    
     try {

        const airplanes = await airplaneRepository.getAll();
        return airplanes;

     }catch(error){

         console.log(error);
         throw error;
     }
}

async function destryAirplane(id){
    
    try {

       const airplanes = await airplaneRepository.destroy(id);
       return airplanes;

    }catch(error){

        console.log(error);
        throw error;
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    destryAirplane
}

