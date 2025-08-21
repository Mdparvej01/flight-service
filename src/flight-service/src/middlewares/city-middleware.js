const {StatusCodes} = require('http-status-codes');

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        return res  
              .status(400)
              .json({
                success:false,
                messege:"please enter city name"
              })
    }
    next();
}


module.exports = {
    validateCreateRequest
}