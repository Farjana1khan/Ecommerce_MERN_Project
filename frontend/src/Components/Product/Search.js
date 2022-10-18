import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import "./Search.css"
const Search=()=> {

    const [keyword, setKeyword] = useState("")

    const navigate = useNavigate()

    const searchSubmit =(e) =>{
        e.preventDefault()
        if (keyword.trim) {
            navigate(`/products/${keyword}`)
        }
        else {
            navigate("/products")
        }


    }

    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE" />
          
            <h1 className='searchProduct'>Search Product</h1>
             <div  className='searchBox'>

          
            <form className='searchBox' onSubmit={searchSubmit} >
                <input type="text" placeholder="Search a Prodduct..." onChange={(e) =>setKeyword(e.target.value)} />
          <input type="submit" value="Search" /> 
            </form>
           </div>
        </Fragment>
    )
}

export default Search
