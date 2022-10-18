import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import {  Routes, Route, Navigate } from 'react-router-dom';


const ProtectedRoute=({isAdmin, element: Component, ...rest })=> {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        
       
        <Fragment>
        {loading === false && (
          
           <Routes>
           <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to="/login" />;
              }
  
              if (isAdmin === true && user.role !== "admin") {
                return <Navigate to="/login" />;
              }
  
              return <Component {...props} />;
            }}
          />
           </Routes>
         
         
          
       
      
        )}
      </Fragment>
     
  
  )
}

export default ProtectedRoute