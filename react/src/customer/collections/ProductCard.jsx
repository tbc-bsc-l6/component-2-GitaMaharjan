// import React, { useEffect, useState } from 'react';
// import bed from '../../assets/category/bed/bed1.jpg';
// import Header from '../../common/header/Header';
// import CircularColor from '../../trial/CircularColor';
// import axios from 'axios';
// import { useParams,Link,useNavigate} from 'react-router-dom';
// import NoProductsFound from '../NoProductsFound';
// // import swal from 'sweetalert2'

// function ProductCard(props) {
//     const {slug } = useParams();
//     const navigate=useNavigate();
//     const [loading,setLoading]=useState(true);
//     const [product,setProduct]=useState([]);
//     const [category,setCategory]=useState([]);
//     const productCount=product.length;

//     useEffect(()=>{
//         let isMounted=true;

//         // const slug=props.match.params.slug;


//         axios.get(`http://127.0.0.1:8000/api/fetch-category-products/${slug}`).then(res=>{
//             if(isMounted){
//                 if(res.data.status===200){
//                     setProduct(res.data.product_data.product);
//                     setCategory(res.data.product_data.category);
//                     setLoading(false);

//                 }else if (res.data.status===401){
//                     // swal("warning",res.data.message,"");
//                     alert("401 error")
                        
//                 }
//                 else if (res.data.status===404){
//                     navigate('/home');
//                     alert("404 error")

//                     // swal("warning",res.data.message,"error");
                        
//                 }
//             }
//         })
//         return()=>{
//             isMounted=false;
//         }
//     },[navigate,slug])

//   return (
//     <div>
//         <div className="2xl:mx-auto 2xl:container mx-4 py-16">
//             <div className=" w-full  relative flex items-center justify-center">
//             <img
//                 src={`http://127.0.0.1:8000/storage/${category.image}`}
//                 alt="dining"
//                 className="max-w-full max-h-full w-full h-full absolute z-0 hidden xl:block object-cover"
//                 />
              
//                 <div className="bg-gray-800 bg-opacity-60 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
//                     <h1 className="text-4xl font-semibold leading-9 text-white text-center">{category.name}</h1>
//                     <p className="text-base leading-normal text-center text-white mt-6">
//                         {category.description}
//                     </p>
                    
//                 </div>
//             </div>
//         </div>
//         {loading ? (
//         <CircularColor />
//       ) : productCount > 0 ? (
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             justifyContent: 'space-evenly',
//           }}
//         >
//           {product.map((item, id) => {
//             return (
//               <div
//                 key={id}
//                 style={{
//                   width: 'calc(33.33% - 20px)',
//                   marginBottom: '20px',
//                 }}
//               >
//                 <div
//                   style={{
//                     backgroundColor: 'pink',
//                     border: '1px solid #e2e8f0',
//                     borderRadius: '0.375rem',
//                     // height:'600px',
//                     boxShadow:
//                       '0 0.25rem 0.375rem rgba(0, 0, 0, 0.05), 0 0.125rem 0.25rem rgba(0, 0, 0, 0.04)',
//                   }}
//                 >
//                   <Link to={`/productdetail/${item.id}`}>
//                     <div style={{height:'600px'}}>
//                     <img
//                       style={{
//                         width: '100%',
//                         height: '50%',
//                       }}
//                       src={`http://127.0.0.1:8000/images/${item.image}`}
//                       alt={item.name}
//                     /></div>
//                   </Link>
//                   <div style={{ padding: '1rem',  backgroundColor: 'red',
//  }}>
//                     <a
//                       href="#"
//                       style={{
//                         color: 'black',
//                       }}
//                     >
//                       <Link to={`/productdetail/${item.id}`}>
//                         <h5
//                           style={{
//                             fontSize: '1.125rem',
//                             fontWeight: '600',
//                             lineHeight: '1.75rem',
//                           }}
//                         >
//                           {item.name}
//                         </h5>
//                       </Link>
//                     </a>

//                     <div style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         marginTop: '0.75rem',
//                       }}
//                     >
//                       <span
//                         style={{fontSize: '1.125rem',fontWeight: '700',
//                         }}
//                       >
//                         {item.price}
//                       </span>

//                       <a
//                         href="#"
//                         style={{color: '#fff', backgroundColor: '#4a90e2',hoverBackgroundColor: '#3182ce',focusRingColor: '#63b3ed',fontWeight: '500',
//                         borderRadius: '0.375rem',fontSize: '0.875rem',padding: '0.625rem 1.25rem',textAlign: 'center',darkBackgroundColor: '#2c5282',darkHoverBackgroundColor: '#2c5282',darkFocusRingColor: '#90cdf4',
//                         }}
//                       >
//                         Add to Cart
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <NoProductsFound />
//       )}
//     </div>
//   );
// }


// export default ProductCard;


//******************************************************* */


import React, { useEffect, useState } from 'react';
import bed from '../../assets/category/bed/bed1.jpg';
import Header from '../../common/header/Header';
import CircularColor from '../../trial/CircularColor';
import axios from 'axios';
import { useParams,Link,useNavigate} from 'react-router-dom';
import NoProductsFound from '../NoProductsFound';
// import swal from 'sweetalert2'

function ProductCard(props) {
    const {slug } = useParams();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(true);
    const [product,setProduct]=useState([]);
    const [category,setCategory]=useState([]);
    const productCount=product.length;

    useEffect(()=>{
        let isMounted=true;

        // const slug=props.match.params.slug;


        axios.get(`http://127.0.0.1:8000/api/fetch-category-products/${slug}`).then(res=>{
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
    },[navigate,slug])

  return (
    <div>
        <div className="2xl:mx-auto 2xl:container mx-4 py-16">
            <div className=" w-full  relative flex items-center justify-center">
            <img
                src={`http://127.0.0.1:8000/storage/${category.image}`}
                alt="dining"
                className="max-w-full max-h-full w-full h-full absolute z-0 hidden xl:block object-cover"
                />
              
                <div className="bg-gray-800 bg-opacity-60 md:my-16 lg:py-16 py-10 w-full md:mx-24 md:px-12 px-4 flex flex-col items-center justify-center relative z-40">
                    <h1 className="text-4xl font-semibold leading-9 text-white text-center">{category.name}</h1>
                    <p className="text-base leading-normal text-center text-white mt-6">
                        {category.description}
                    </p>
                    
                </div>
            </div>
        </div>
        {loading ? (
        <CircularColor />
      ) : productCount > 0 ? (
        <div className="grid grid-cols-1 ml-10 mr-10 mb-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {product.map((item, id) => (
            <div key={id} className="mt-10">
            <div className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50    sm:p-28 py-40 px-10 flex justify-center items-center rounded-lg border border-gray-300">
                <div
                  style={{
                    width: '100%',
                    height: '200px', // Set a specific height for the image container
                    borderRadius: '0.375rem',
                    overflow: 'hidden',
                  }}
                >
                  <Link to={`/productdetail/${item.id}`}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%', // Occupy the full height of the container
                        objectFit: 'cover', // Maintain aspect ratio and cover the container
                      }}
                      src={`http://127.0.0.1:8000/images/${item.image}`}
                      alt="sofa-2"
                      className="group-hover:opacity-60 transition duration-500"
                    />
                  </Link>
                </div>
                <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">{item.name}</p>
                  </div>
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800">Rs. {item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500">
                  <button>
                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z"
                        fill="#1F2937"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoProductsFound />
      )}
    </div>
  );
}
export default ProductCard;
