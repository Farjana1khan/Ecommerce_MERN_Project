const express = require("express");


const { newOrder, getSingleOrderById, FindUserOrders, getAllOrders, updateOrder, deleteOrder} = require("../controller/orderController")


const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


//Create Orders
router.route("/order/new").post(isAuthenticatedUser, newOrder)


//Find single order details by Id ->when Admin is logged in 
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrderById)

//Get All Orders By-> User
router.route("/orders/me/user").get(isAuthenticatedUser, FindUserOrders)


  //Get All Orders -> when is logged in -> Admin(All Orders)
  router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)


//Update order
  router.route("/admin/order/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)


  //Delete order
  router.route("/admin/order/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)



module.exports = router;


