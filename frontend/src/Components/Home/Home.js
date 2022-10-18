import React, { Fragment, useEffect } from 'react'
import { BiChevronUpCircle } from "react-icons/bi";
import  './Home.css';

import ProductCard from './ProductCard'
import MetaData from '../Layout/MetaData';
 import { clearErrors, getProducts } from "../../actions/productAction";
 import { useSelector, useDispatch } from "react-redux";
 import Loader from '../Layout/Loader/Loader';
 import { useAlert } from "react-alert";

const Home = () => {

    const alert = useAlert()


 const dispatch = useDispatch();
 const { loading, error, products } = useSelector(
    (state) => state.products
    );
 

  useEffect(() => {
  if(error){
    alert.error(error)
    dispatch(clearErrors())
  }
  dispatch(getProducts())
     console.log( dispatch(getProducts()));

  }, [dispatch, error, alert])


    return (
        <Fragment>

       
            <MetaData title="e-Commerce" />
           <div className='banner'>
            <p>Welcome to e-Commerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href='#container'>
                <button>
                    <BiChevronUpCircle/>
                </button>
            </a>
           </div>
           {loading ? (
            <Loader  />
        ): (
         <Fragment>   
         <h2 id='container' className='homeHeading'>Featured Products</h2> 
        <div className='container'>
        
        {products &&
           products.map((product) => (
             <ProductCard key={product._id} product={product} />
           ))}
        
        </div>
         </Fragment>

           
         
        )
        }
        </Fragment>
    )
}

export default Home
