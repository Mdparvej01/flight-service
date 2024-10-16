const { AirplaneService } = require('../services');

const {StatusCodes } = require('http-status-codes');

async function createAirplane (req,res) {


    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity

        });

    
        return res.status(StatusCodes.CREATED)
                 .json({
                    success:true,
                    message:"Successfully created an airplane",
                    data:airplane,
                    error:{}
                 })

    } catch (error){
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json({
                success:false,
                message:"Something went wrong while creating airplane :(",
                error
               })
        
    }
}


// get all airplane ...

async function getAirplanes(req,res){

    try {

        const airplanes = await AirplaneService.getAirplanes();
        return res
                .status(200)
                .json({
                    success:true,
                    airplanes
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
    createAirplane,
    getAirplanes
}