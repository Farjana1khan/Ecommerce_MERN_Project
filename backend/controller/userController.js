//const ErrorHandler = require("../utils/errorHandler")

const catchAsyncErrors = require("../middleware/catchAsyncError")

//const ApiFeatures = require("../utils/apiFeatures")

const User = require("../models/userModel")
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncErrors(async(req, res, next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });


    const  { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })

    //const token = user.getJWTToken();

    // res.status(2001).json({
    //     success: true,
    //     // user,   //before using token we  used user after we used token there is no need user
    //     token
    // })
    sendToken(user, 201, res)
})



//Login User

exports.loginUser = catchAsyncErrors(async(req, res, next) =>{

    const { email, password} = req.body;

    //check if user has given email and password
    
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Please Enter Email & Password"
        })
    }


    const user = await User.findOne({email}).select("+password")

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    const isPasswordMatched = await user.comparedPassword(password)

    if(!isPasswordMatched){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })
    }

    //const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     // user,   //before using token we  used user after we used token there is no need user
    //     token
    // })

    sendToken(user, 200, res)

})




//Logout User

exports.logoutUser = catchAsyncErrors(async(req, res, next) =>{
   
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
   
   
   
    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
})




//Forget Password

exports.forgetPassword = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findOne({email: req.body.email})

    if(!user){
        res.status(404).json({
            success: true,
            message: "USer not found"
        })

        // return next(new ErrorHandler("user not found"))
    }


    //Get ResetPasswordToken 
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})



    //resetPassword Url


    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
      )}/password/reset/${resetToken}`;

//  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;



        const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you  have not requested this email then, please ignore it.` ;

        try {
            await sendEmail({
                email: user.email,
                subject: `eCommerce Password Recovery`,
                message,
            })
            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
              });
            
        } catch (error) {
            

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({validateBeforeSave: false});

            res.status(500).json({
                success: true,
                message:error.message
              });

            // return next(new ErrorHandler(error.message, 500))

        }
})



//ResetPassword

exports.resetPassword = catchAsyncErrors(async(req, res, next) =>{

    //creating Hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")



    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        res.status(400).json({
            success: true,
            message:"Reset Password Token is Invalid or has expired",
          });
    }

    if(req.body.password !== req.body.confirmPassword){
        res.status(400).json({
            success: true,
            message:"Password does not match",
          });

            //return next(new ErrorHandler(message, 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res)

})




//GET User Detail By ID

exports.getUserDetailById = catchAsyncErrors(async(req, res, next) =>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})



//Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next)=>{

    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparedPassword(req.body.oldPassword)

    if(!isPasswordMatched){
        res.status(400).json({
            success: true,
            message: "Old password is incorrect"
        })
        //return next(new ErrorHandler(message, 400))
    }

       

        if(req.body.newPassword !== req.body.confirmPassword){
            res.status(400).json({
                success: true,
                message:"Password does not match",
              });
    
               // return next(new ErrorHandler(message, 400))
        }

        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res)
    
})




//Update User Profile

exports.updateUserProfile = catchAsyncErrors(async(req, res, next) =>{

const newUserData = {
    name: req.body.name,
    email: req.body.email
}


//We will add Cloudinary later
if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }



    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {


        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        
    })
    


})



//Get all Users -> such as Admin and User

exports.getAllUser = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})


//Get single user-(admin)

exports.getSingleUser = catchAsyncErrors(async(req, res, next)=>{
    const user = await User.findById(req.params.id)


    if(!user){
        res.status(200).json({
            success: true,
            message: `User does not exist with id ${req.params.id}`
        }) 
    }

    res.status(200).json({
        success: true,
        user
    })
})




//Update User Role (User Role OR Admin Role)

exports.updateUserRole = catchAsyncErrors(async(req, res, next) =>{

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    

    let user = User.findById(req.params.id)
    

    if(!user){
        res.status(400).json({
            success: true,
            message: `User does not exist with Id ${req.params.id}`
        }) 
    }

     user =  await User.findByIdAndUpdate(req.params.id, newUserData, {
    
    
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    
        res.status(200).json({
            success: true,
            
        })
    })



    //Delete User Role By ID -> Admin  

exports.deleteUserDetailById = catchAsyncErrors(async(req, res, next) =>{

    const user = await User.findById(req.params.id)


    if(!user){
        res.status(400).json({
            success: true,
            message: `User does not exist with Id ${req.params.id}`
        }) 
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

await user.remove()

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    })
})