 const {StatusCodes} = require('http-status-codes')

 const { CityService } = require('../services');


 async function createCity (req,res) {


    try {
        const city = await CityService.createCity({
            name:req.body.name,
        });

        console.log("city=>",city);

    
        return res.status(StatusCodes.CREATED)
                 .json({
                    success:true,
                    message:"Successfully created added a City",
                    data:city,
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


async function  destroyCity (req,res) {
    console.log("id->", req.params.id);


    try {
        const city = await CityService.destroyCity(req.params.id);

    
        return res.status(StatusCodes.CREATED)
                 .json({
                    success:true,
                    message:"Successfully Deleted a City",
                    data:city,
                    error:{}
                 })

    } catch (error){
        
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
               .json({
                success:false,
                message:"Something went wrong while deleting city :(",
                error
               })
        
    }
}

module.exports = {
    createCity,
    destroyCity
}
