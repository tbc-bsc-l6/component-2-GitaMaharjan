import React, { useEffect, useState } from 'react';
import bed from '../../assets/category/bed/bed1.jpg';
import Header from '../../common/header/Header';
import CircularColor from '../../trial/CircularColor';
import axios from 'axios';
import { useParams,Link,useNavigate} from 'react-router-dom';
// import swal from 'sweetalert2'

function ProductCard(props) {
    const { product_slug } = useParams();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState([]);
    const productCount=product.length;

    useEffect(()=>{
        let isMounted=true;

        // const product_slug=props.match.params.slug;


        axios.get(`http://127.0.0.1:8000/api/fetch-category-products/${product_slug}`).then(res=>{
            if(isMounted){
                if(res.data.status===200){
                    setProduct(res.data.product_data.product);
                    setCategory(res.data.product_data.category);
                    setLoading(false);

                }else if (res.data.status===401){
                    // swal("warning",res.data.message,"");
                    alert("401 error")
                        
                }
                else if (res.data.status===404){
                    navigate('/home');
                    alert("404 error")

                    // swal("warning",res.data.message,"error");
                        
                }
            }
        })
        return()=>{
            isMounted=false;
        }
    },[navigate,product_slug])

  return (
    <div>
        {loading?<CircularColor/>:(productCount>0?

            product.map((item,id)=>{
                return(
                    <div className="max-w-sm m-10" key={id}>{category.name}
                    
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <Link to="">
                                <img className="w-full h-48 object-cover rounded-t-lg" src={item.image} alt={item.name} />
                            </Link>
                            <div className="p-4">
                            <a href="#" className="text-gray-900 dark:text-white">
                                <h5 className="text-l font-semibold tracking-tight">{item.name}</h5>
                            </a>

                            <div className="flex items-center justify-between mt-3">
                                <span className="text-l font-bold text-gray-900 dark:text-white">{item.price}</span>

                                <a
                                href="#"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                Add to Cart
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })
        :<h1>No Products</h1>)
        }
    </div>
  )
}



export default ProductCard;
