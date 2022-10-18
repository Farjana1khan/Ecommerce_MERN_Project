import React, { useState,useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useSelector} from 'react-redux'
import Header from './Components/Layout/Header/Header'

import Home from './Components/Home/Home';

import About from './Components/Layout/About/About'

import Contact from './Components/Layout/Contact/Contact'

//For Products Component
import ProductDetails from './Components/Product/ProductDetails'
import Products from './Components/Product/Products'






//For Users Component
import LoginSignup from './Components/User/LoginSignup'


////For UserProfile Component
import Profile from './Components/User/Profile'


//For Search Component
import Search from './Components/Product/Search'


//For Footer Component
import Footer from './Components/Layout/Footer/Footer'

import NotFound from "./Components/Layout/NotFoundPage/NotFound";
import WebFont from  "webfontloader"

//Store Component
import store from './Store';
import "./App.css"
import { loadUser } from './actions/userAction';

//For Header-userOption Components
import UserOptions from './Components/Layout/Header/UserOptions'


//For User Component
import UpdateProfile from './Components/User/UpdateProfile';
import UpdatePassword from './Components/User/UpdatePassword';

import ForgotPassword from './Components/User/ForgotPassword'

import ResetPassword from './Components/User/ResetPassword'

//cart 
import Cart from './Components/Cart/Cart'

//for Shipping Component
import Shipping from './Components/Cart/Shipping'


//For Order Component
import ConfirmOrder from './Components/Cart/ConfirmOrder';
import OrderSuccess from './Components/Cart/OrderSuccess'
import MyOrders from './Components/Order/myOrders';
import OrderDetails from './Components/Order/orderDetails'


//For Admin
import OrderList from './Components/Admin/OrderList'

import ProcessOrder from './Components/Admin/ProcessOrder'
//For Admin
import NewProduct from './Components/Admin/NewProduct'




import axios from 'axios';

// For Payment
import Payment from "./Components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



// Admin-Dashboard
import Dashboard from './Components/Admin/Dashboard'

// Admin-ProductList
import ProductList from './Components/Admin/ProductList'

//Update Product

import UpdateProduct from './Components/Admin/UpdateProduct'
import UserList from './Components/Admin/UserList';
import UpdateUser from './Components/Admin/UpdateUser';
import ProductReviews from './Components/Admin/ProductReviews';





//import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
function App() {

  
  
   const {isAuthenticated, user} = useSelector(state => state.user)

   const [stripeApiKey, setStripeApiKey] = useState("")


async function getStripeApiKey(){

  const {data} = await axios.get("/api/v1/stripeapikey")

  setStripeApiKey(data.stripeApiKey)
}


  useEffect(() =>{
    WebFont.load(
      {
        google: {
          families:["Arial", "Droid Sans", "Chilanka"]
        }
      })

      store.dispatch(loadUser())

      getStripeApiKey()

  }, [])


  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
   <Router>

    <Header />
       {isAuthenticated && <UserOptions user={user} />}




{/* ProtectedRoute */}
   <Routes>
   {stripeApiKey && (
    <Route exact path="/process/payment" element={ <Elements stripe={loadStripe(stripeApiKey)}>
   <Payment/>
   
    </Elements>}  />
     
    )}
   <Route exact path='/' element={<Home/>} />

   <Route exact path='/product/:id' element={<ProductDetails/>} />
   <Route exact path='/products' element={<Products/>} />
   <Route path="/products/:keyword" element={<Products />} />
   <Route exact path='/about' element={<About/>} />
 
   <Route exact path='/contact' element={<Contact/>} />
   <Route exact path='/search' element={<Search/>} />

<Route exact path='/cart' element={<Cart/>} />

   <Route exact path='/login' element={<LoginSignup />}/>
   <Route exact path='/password/forgot' element={<ForgotPassword/>}  />
<Route exact path="/password/reset/:token" element={<ResetPassword/>} />



{/* ProtectedRoute */}
<Route exact path='/account' element={<Profile />} />
  


<Route exact path='/me/update' element={<UpdateProfile/>
 }  />


<Route exact  path='/password/update' element={<UpdatePassword/>
  } />


  
   <Route exact path='/login/shipping/*' element={<Shipping/>
    } />


<Route exact path='/order/confirm' element={<ConfirmOrder />
 }  />

<Route  exact path="/success" element={<OrderSuccess />
 } /> 

{/*  MyOrders OR user Orders details */}

<Route exact  path='/orders' element={<MyOrders />
 } />


{/* Single user Order details By id */}

<Route exact  path='/order/:id' element={<OrderDetails />
 } />

{/* Admin-Dashboard */}

<Route  
//isAdmin={true}
 exact path="/admin/dashboard" element={
 <Dashboard/>
 } 
  
 /> 


{/* NewProduct-Admin */}

<Route
          exact
          path="/admin/product"
          // //isAdmin={true}
          element={<NewProduct />
          }
        />



<Route
          exact
          path="/admin/product/:id"
          //isAdmin={true}
         element={<UpdateProduct/>
          }/>

{/* Admin-ProductList */}

<Route  
isAdmin={true}
 exact  path="/admin/products"  element={<ProductList/>
 } /> 



<Route
          exact
          path="/admin/orders"
          //isAdmin={true}
          element={<OrderList />
          }
        />


<Route
          exact
          path="/admin/order/:id"
          //isAdmin={true}
          element={<ProcessOrder />
           }
        />


<Route
          exact
          path="/admin/users"
          //isAdmin={true}
          element={<UserList />
          }
        />



<Route
          exact
          path="/admin/user/:id"
          //isAdmin={true}
          element={<UpdateUser/>
            }
        />



<Route
          exact
          path="/admin/reviews"
          //isAdmin={true}
          element={<ProductReviews/>
           }
        />
{/* ProtectedRoute End */}



<Route exact path="/payment/process" element={<Payment/>}  />


<Route
          element={
            window.location.pathname === "/process/payment" ? null : <NotFound/>
          }
        />
{/* 
   <Route  element={window.location.pathname=== "/contact" ? null : <NotFound/>} /> */}

</Routes>

    <Footer />
   </Router>
  );
}

export default App;
