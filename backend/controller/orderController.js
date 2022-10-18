const Order = require("../models/orderModel")
const Product = require("../models/productModel")
//const ErrorHandler = require("../utils/errorHandler")

const catchAsyncErrors = require("../middleware/catchAsyncError")
//const ApiFeatures = require("../utils/apiFeatures")


exports.newOrder = catchAsyncErrors(async(req, res) =>{

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice  } = req.body

    const order = await Order.create({

        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order
    })


})

//Get Single order By orderId
exports.getSingleOrderById = catchAsyncErrors(
    async(req, res, next) =>{
        const order = await Order.findById(req.params.id).populate("user", "name email")
    
        if(!order){
            return res.status(500).json({
                success: false,
                message: "Order not found with this Id"
            })
    
            //return next(new ErrorHandler("Order not found with this Id", 404));        //we use error handler method
        }
            res.status(200).json({
                success: true,
               order
        
            });
        });


        //Get Logged in User-> Find user Orders OR MyOrders
       
exports.FindUserOrders = catchAsyncErrors(
    async(req, res, next) =>{
        const orders = await Order.find({user: req.user._id})

     res.status(200).json({
                success: true,
               orders
        
            });
        });




         //Get All Orders-> Admin
       
exports.getAllOrders = catchAsyncErrors(
    async(req, res, next) =>{
        const orders = await Order.find()

        let totalAmount = 0;
        orders.forEach((order)=>{
            totalAmount+= order.totalPrice
        })
     res.status(200).json({
                success: true,
                totalAmount,
               orders
        
            });
        });


//Update order

exports.updateOrder = catchAsyncErrors(async(req, res, next) =>{

    const order = await Order.findById(req.params.id)

    if(!order){
        res.status(404).json({
            success: true,
            message: "Order not found with this Id"
        })
    }

    if(order.orderStatus === "Delivered"){

        res.status(400).json({
            success: true,
            message: "You have already delivered this order"
        })
    }



    

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (order) => {
          await updateStock(order.product, order.quantity);
        });

    }

order.orderStatus = req.body.status;


if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now()
}


await order.save({ validateBeforeSave: false})
res.status(200).json({
    success:true

})

})


async function updateStock(id, quantity){
    const product = await Product.findById(id)

     product.Stock -= quantity;

    await product.save({ validateBeforeSave: false})
   
}



//Delete order by ->Admin

exports.deleteOrder = catchAsyncErrors(async(req, res, next)=>{

    const order = await Order.findById(req.params.id)

    if(!order){

        res.status(404).json({
            success: false,
            message: "Order not found with this Id"
        })
    }


    await order.remove()


    res.status(200).json({
        success: true,
       
    })



})
