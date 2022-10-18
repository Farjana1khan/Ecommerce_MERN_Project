import { createStore, combineReducers, applyMiddleware, } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//import { composeWithDevTools } from 'remote-redux-devtools'

import {   productsReducer,productDetailsReducer, newReviewReducer, newProductReducer, ProductReducer, productReviewsReducer, deleteReviewReducer} from "./reducers/productReducer";

import { forgotPasswordReducer, profileReducer, userReducer, allUsersReducer, UserDetailsReducer} from './reducers/userReducer'

import { cartReducer } from "./reducers/cartReducer";

import {newOrderReducer, myOrdersReducer, orderDetailsReducer, allOrdersReducer, OrderReducer} from './reducers/orderReducer'



const reducer = combineReducers({

  //All Products
  products:   productsReducer,
  product: ProductReducer,
  productDetails: productDetailsReducer,
  //Create Product
  newProduct: newProductReducer,

  //User Profile 
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,

  //Cart
  cart: cartReducer,
  //Order Reducer
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
   //Update And Delete orderReducer
   order: OrderReducer,
  orderDetails: orderDetailsReducer,

  //Product Review
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  deleteReview: deleteReviewReducer,

  //User Reducer
  user: userReducer,
  allUsers:allUsersReducer,
  userDetails: UserDetailsReducer
  
})




let initialState = {

  cart: {
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

    shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
  }

}



const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store