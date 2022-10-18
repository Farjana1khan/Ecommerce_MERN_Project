import React, { Fragment , useEffect, useState} from "react";


import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import { useParams } from 'react-router-dom';

import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";

import MetaData from '../Layout/MetaData';
import "./Products.css"
import Loader from "../Layout/Loader/Loader";
import { Typography } from "@material-ui/core";




const Products=()=> {

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 35000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const dispatch = useDispatch();

  const alert = useAlert();

  const  params = useParams();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  

  const {
    products,
    productsCount,
    resultPerPagePagination,
    filteredProductsCount,
    loading,
    error,
  } = useSelector((state) => state.products);

  const keyword = params.keyword

  const setCurrentPageNo= (e)=>{
    setCurrentPage(e)
  }

  const priceHandler= (event, newPrice) =>
  {
setPrice(newPrice)
  }




  let count = filteredProductsCount;

  useEffect(() => {
   if(error) {
    alert.error(error)
    dispatch(clearErrors)
   }
   dispatch(getProducts(keyword, currentPage, price, category, ratings))
  }, [dispatch , keyword, alert, error, currentPage ,price, category, ratings])

  

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
      <MetaData title=" PRODUCTS ECOMMERCE" />
      
      <h2 className="productsHeading">Products</h2>
     
      <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          
          <div className="filterBox">

          <Typography className="price">Price</Typography>
            <Slider
             className="slider"
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={35000}
            />
             <Typography className="category">CATEGORIES</Typography>
             <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                {/* <hr/> */}
                  {category}
                </li>
              ))}
            </ul>

            <fieldset className="ratings">
              <Typography  className="legend">Ratings Above</Typography>
              <Slider
              className="slider"
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
             
                min={0}
                max={5}
              />
            </fieldset>
          </div>
         
  
          {resultPerPagePagination  < count   && (
            <div className="paginationBox">
              <Pagination
                 activePage={currentPage}
                 itemsCountPerPage={resultPerPagePagination}
                 totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="<<"
                lastPageText=">>"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

         
    </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
