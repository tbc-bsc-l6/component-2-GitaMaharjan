

import React, {useState, useRef, useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios';
import { useNavigate, Navigate, redirect } from 'react-router-dom';

const ProductForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]); 
 

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/api/get-categories").then((response)=>{
      let arrPro = response.data.allCategories;
      setCategory(arrPro);
  })
  },[])


  const [vars, setVar] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_description: "",
    product_category: "",
    product_discount: "",
    product_image: null
  });

  const changeImage = (e) =>{
    setVar({...vars, [e.target.name]: e.target.files[0]});
  }

  const [cats, setCat] = useState({
    cname: "",
    cdesc: ""
  })
  const submitProduct = (e) =>{
    e.preventDefault();
    if(vars.product_name != "" && vars.product_price != "" && vars.product_quantity != "" && vars.product_description != "" && vars.product_category != "" && vars.product_discount != ""){
      const userdata = {
        product_name: vars.product_name,
        product_price: vars.product_price,
        product_quantity: vars.product_quantity,
        product_description: vars.product_description,
        product_category: vars.product_category,
        product_discount: vars.product_discount
      };
      try{
        axios.post("http://127.0.0.1:8000/api/add-products", userdata).then((response)=>{
          if(response.data.status===true){
            const data = new FormData();
            data.append('image', vars.product_image);
            data.append("id", response.data.id);
            axios.post("http://127.0.0.1:8000/api/add-product-images", data).then((res)=>{
              navigate("/dashboard/products");
            })
          }
        }) 
      }
      catch(e){
        console.log(e);
      }

      
    }

  }

  const changeField = (e) =>{

      setVar({...vars, [e.target.name]:e.target.value });
    
  }

  
  const changeCatValue = (e)=>{
    setCat({...cats, [e.target.name]: e.target.value})
  }
  return (
    <>
  <div >
  
      <div className="max-w-xl bg-pink rounded-lg overflow-hidden shadow-md p-6">
        <form
          onSubmit={(e) => {
            submitProduct(e);
          }}
        >
          <div className='mb-6'>
            <p className='text-xl font-bold'>Add a Product</p>
          </div>
  
          <div className='mb-6'>
          <label htmlFor="productName" className="block text-sm font-bold text-gray-700 mb-2">
          Product Name
        </label>
            <input
              value={vars.product_name}
              name='product_name'
              onChange={(e) => {
                changeField(e);
              }}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id='productName'
              type='text'
              placeholder='Enter product name'
              required

            />

          </div>
  
          
    <div className='mb-6 flex'>
      <div className='w-1/2 pr-3'>
        <label htmlFor="productPrice" className="block text-sm font-bold text-gray-700 mb-2">
          Price
        </label>
        <input
          value={vars.product_price}
          name='product_price'
          onInput={(e) => {
            changeField(e);
          }}
          placeholder="Enter product price"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id='productPrice'
          type='number'
          required
        />
      </div>

      <div className='w-1/2 pl-3'>
        <label htmlFor="productQuantity" className="block text-sm font-bold text-gray-700 mb-2">
          Quantity
        </label>
        <input
          value={vars.product_quantity}
          name='product_quantity'
          onInput={(e) => {
            changeField(e);
          }}
          id='productQuantity'
          type='number'
          placeholder="Enter product quantity"
          className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          required
        />
      </div>
    </div>
  
          <div className='mb-6'>
          <label htmlFor="productDescription" className="block text-sm font-bold text-gray-700 mb-2">
          Description
        </label>
            <textarea
              name='product_description'
              value={vars.product_description}
              onChange={(e) => {
                changeField(e);
              }}
              rows={5}
              id='productDescription'
              placeholder="Enter product description"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />

          </div>
          <div className='mb-6 flex'>

          <div className='mb-6'>
          <label htmlFor="productImage" className="block text-sm font-bold text-gray-700 mb-2">
          Product Image
        </label>
            <input
              type='file'
              name='product_image'
              onInput={(e) => {
                changeImage(e);
              }}
              id='productImage'
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              required
            />
          </div>
          <div className='mb-6'>
          <label htmlFor="discount" className="block text-sm font-bold text-gray-700 mb-2">
          Discount(%)
        </label>
            <input
              value={vars.product_discount}
              onChange={(e) => {
                changeField(e);
              }}
              name='product_discount'
              className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id='discount'
              type='number'
            />
          </div>
          </div>
  
          <div className='mb-6'>
          <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">
          Select category
        </label>
            <div className='relative'>
              <select
                value={vars.product_category}
                onChange={(e) => {
                  changeField(e);
                }}
                name='product_category'
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id='category'
                required
              >
                <option value='' disabled>
                  Select
                </option>
                {/* <option  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
 value='new'>
                  New Category
                </option> */}
                {category.map((cat, index) => {
                
                  return  <option className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  key={index} value={cat['id']}>
                    {cat['name']}
                  </option>
                })}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>
          </div>
  
        
  
          <div className='mb-6 mt-8'>
            <button
              type='submit'
              className=" w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </>
  
  )
}

export default ProductForm




