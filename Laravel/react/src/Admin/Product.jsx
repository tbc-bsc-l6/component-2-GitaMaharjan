
import axios from 'axios';
import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {addProduct, deleteProduct } from '../authentication/productSlice';
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { memoize } from 'proxy-memoize';
import { useCallback } from 'react';

const Product = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const callSearchValue = (value) =>{
        setSearchValue(value);
    }
    
    const deleteProduct = (event)=>{
        event.preventDefault();
        let id = event.target.dataset.id;
        axios.delete("http://127.0.0.1:8000/api/delete-products/"+id).then((response)=>{
            // console.log(response);
            dispatch(deleteProduct({id: id}));
        })
    }

    const filterProductsBySearch = memoize(state =>
        state.productReducer.products.filter((product)=>{
            if(searchValue === ""){
                return product;
            }
            else{
                let discount = `${product.discount_id}`
                return product.name.toLowerCase().includes(searchValue.toLowerCase()) || product.category_name.toLowerCase().includes(searchValue.toLowerCase()) || discount.includes(searchValue);
            }
        })
    
    )

      const { productItem } = useSelector(useCallback(memoize(state => ({
        productItem: filterProductsBySearch(state),
        
      })), [searchValue]));

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get-products").then((response)=>{
            console.log(response);
            dispatch(addProduct(response.data.products));
            
        })
    },[]);  


  return (
    <div>
        <div className='flex md:flex-row flex-col items-baseline justify-between w-full mb-6'>

      {/* <h1 className='text-xl font-weight mb-0'></h1> */}
      <div className='flex md:flex-row flex-col md:mt-0 mt-4 items-baseline justify-between gap-5'>

      <Link to='/dashboard/products-form'>
      <button type='submit' className=" relative overflow-x-auto shadow-md sm:rounded-lg  w-full bg-pink text-black py-2 px-4 rounded hover:bg-pink-200"
>Add Product from here</button>
        </Link>

      </div>
      <Search callSearchValue={callSearchValue}/>

        </div>
        
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.N.
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>

                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
  
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount(%)
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
           <tr className={productItem.length === 0 ? 'block': 'hidden'}><td>No Searches Found</td></tr>
    {
        
        productItem.map((item, id)=>{
            
            return (
                <tr key={item.nanoid} >
                    <td className="px-6 py-4">
                        {id+1}
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.name}
                    </th>

  
                    <td className="px-6 py-4">
                        {item.price}
                    </td>
                    <td className="px-6 py-4">
                        {item.quantity}
                    </td>
                    <td className="px-6 py-4">
                        {item.category_name}
                    </td>
                    <td className="px-6 py-4">
                        {item.discount_id}
                    </td>
                    <td className="px-6 py-4">
                        <img className='w-16 h-16' src={`http://127.0.0.1:8000/images/${item.image}`} alt="Not available" />
                    </td>
                    <td className="px-6 py-4">
                    {item.created_at ? item.created_at.substring(0, 10) : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                        <Link data-id={item.id} to={`/dashboard/edit_product/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                        <br/>
                        <Link data-id={item.id} onClick={(e)=>{deleteProduct(e)}} className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</Link>
                    </td>
                </tr>
                            );
                        })
                    }
        </tbody>
    </table>
</div>

    </div>
  )
}

export default Product

