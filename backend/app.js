const  express = require('express')
const app = express()
// const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const helmet = require('helmet');
const path = require("path");
//Error Handler
//const ErrorHandler = require('./utils/errorHandler');
//app.use(ErrorHandler)


//middleware
//const errorMiddleware = require("./middleware/error")
//app.use(errorMiddleware)



app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded( {extended: true}))
app.use(fileUpload())


app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "example.com"],
      "img-src": ["'self'", "https: data:"]
    }
  })
)




// Config for deployment
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

//Route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/payementRoute")




app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


module.exports = app;