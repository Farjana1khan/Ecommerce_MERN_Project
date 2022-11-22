const app = require ("./app")

// const dotenv = require("dotenv")
const connectDatabase = require("./config/database")

//cloudinary
const cloudinary = require('cloudinary')

//uncaughtExceptionError
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaughtException');
process.exit(1)

})


// //run Config for localhost
// dotenv.config({ path: "backend/config/config.env" });


// Config for deployment
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

cloudinary.config(
   {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
   })


//Connect Database

connectDatabase();



//Server running 
 const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost: ${process.env.PORT}`);
})

//Unhandled Promise rejection

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled Promise Rejection');

server.close(()=>{
    process.exit(1)
})
})