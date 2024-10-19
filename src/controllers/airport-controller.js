const { AirportService } = require('../services');

const {StatusCodes } = require('http-status-codes');


async function createAirport (req,res) {


    try {
        const airport = await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId

        });

    
        return res.status(StatusCodes.CREATED)
                 .json({
                    success:true,
                    message:"Successfully created an airport",
                    data:airport,
                    error:{}
                 })

    } catch (error){
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json({
                success:false,
                message:"Something went wrong while creating airport :(",
                error
               })
        
    }
}


// get all airplane ...

async function getAirports(req,res){

    try {

        const airports = await AirportService.getAirports();
        return res
                .status(200)
                .json({
                    success:true,
                    airports
                })

    } catch(error){
        return res
                 .status(400)
                 .json({
                    success:false,
                    error
                 })
    }
}


// get by id
async function getAirport(req,res){

    try {

        const airport = await AirportService.getAirport(req.params.id);
        return res
                .status(200)
                .json({
                    success:true,
                    airport
                })

    } catch(error){
        return res
                 .status(400)
                 .json({
                    success:false,
                    error
                 })
    }
}

// destroy by id ...

async function destroyAirport(req,res){

    try {

        const airport = await AirportService.destroyAirport(req.params.id);
        return res
                .status(200)
                .json({
                    success:true,
                    airport
                })

    } catch(error){
        return res
                 .status(400)
                 .json({
                    success:false,
                    error
                 })
    }
}







module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport
}