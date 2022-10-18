//const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("./catchAsyncError")

//const ApiFeatures = require("../utils/apiFeatures")
const jwt = require("jsonwebtoken")

const User = require("../models/userModel")

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{

    const {token} = req.cookies

    console.log(token);
    if(!token){
        res.status(401).json({
            success: false,
            message: "Please Login to access this resource"
        })

    //     //return next(new ErrorHander("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await  User.findById(decodedData.id)

    next();

    
    
})



exports.authorizeRoles = (...roles) => {
    return(req, res, next) =>{
        if(!roles.includes(req.user.role)){
            res.status(403).json({
                message: `Role: ${req.user.role} is not allowed to access this resources`,

            })

        }
        next()
    }
}