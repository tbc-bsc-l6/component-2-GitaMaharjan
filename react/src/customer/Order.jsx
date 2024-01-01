// /* eslint-disable react/jsx-key */
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { add_cart_item, delete_cart_item } from "../authentication/CartSlice";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import CartProduct from "./CartProduct";

// // function makeObjectsUnique(arr, property) {
// //   const uniqueValues = new Set();
// //   return arr.filter((obj) => {
// //     if (!uniqueValues.has(obj[property])) {
// //       uniqueValues.add(obj[property]);
// //       return true;
// //     }
// //     return false;
// //   });
// // }

// function makeObjectsUnique(arr, property) {
//   const uniqueValues = new Set();
//   return arr.reduce((uniqueObjects, obj) => {
//     if (!uniqueValues.has(obj[property])) {
//       uniqueValues.add(obj[property]);
//       uniqueObjects.push(obj);
//     }
//     return uniqueObjects;
//   }, []);
// }

// const Order = () => {
//   const [orderModal, setOrderModal] = useState(false);
//   const [orderValue, setOrderValue] = useState({
//     address: "",
//     date: "",
//     remarks: "",
//   });
//   const changeOrderValue = (e) => {
//     setOrderValue({ ...orderValue, [e.target.name]: e.target.value });
//   };
//   const changeOrderDetail = () => {
//     setOrderModal(!orderModal);
//   };
//   const [cartList, setCartList] = useState([]);
//   const cartInfo = (quant, id) => {
//     let arr = [{ quant: quant, id: id }, ...cartList];
//     setCartList((prev) => makeObjectsUnique(arr, "id"));
//   };

//   const nav = useNavigate();
//   const userLogin = useSelector((state) => {
//     return state.authReducer.signin[0];
//   });
//   console.log(userLogin);

//   const placeOrder = (e) => {
//     e.preventDefault();
//     if (
//       orderValue.address != "" &&
//       orderValue.remarks != "" &&
//       orderValue.date != ""
//     ) {
//       cartList.forEach(({ quantity, id }) => {
//         axios
//           .put("http://127.0.0.1:8000/api/updatecart", {
//             quant: quantity,
//             id: id,
//           })
//           .then((response) => {});
//       });
//       axios
//         .post("http://127.0.0.1:8000/api/add_products_to_order", {
//           address: orderValue.address,
//           date: orderValue.date,
//           remarks: orderValue.remarks,
//           login: userLogin.id,
//         })
//         .then((response) => {
//           let value = response.data.order_id;

//           nav("/orderpage/" + value);
//         });
//     }
//   };
//   return (
//     <>
//       <div>
//         <div className="w-100">
//           <div
//             onClick={(e) => changeOrderDetail(e)}
//             className={`${
//               orderModal == false ? "hidden" : "block"
//             } w-screen top-0 left-0 fixed h-screen z-20 inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
//           ></div>
//           <div
//             id="authentication-modal"
//             tabIndex="-1"
//             aria-hidden="true"
//             className={`${
//               orderModal ? "block" : "hidden"
//             } overflow-y-auto overflow-x-hidden left-[-0.5%] fixed md:top-[20%] md:left-[35%] md:translate-x-[0%] md:translate-y-[0%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
//           >
//             <div className="relative p-4 w-full max-w-md max-h-full">
//               <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//                 <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                     Add Order Details
//                   </h3>
//                   <button
//                     onClick={(e) => changeOrderDetail(e)}
//                     type="button"
//                     className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                     data-modal-hide="authentication-modal"
//                   >
//                     <svg
//                       className="w-3 h-3"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 14 14"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                       />
//                     </svg>
//                     <span className="sr-only">Close modal</span>
//                   </button>
//                 </div>
//                 <div className="p-4 md:p-5">
//                   <form className="space-y-4" action="#">
//                     <div>
//                       <label
//                         htmlFor="cadd"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Order Address
//                       </label>
//                       <input
//                         value={orderValue.address}
//                         onChange={(e) => changeOrderValue(e)}
//                         type="text"
//                         name="address"
//                         id="cadd"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="cdate"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Delivery date
//                       </label>
//                       <input
//                         value={orderValue.date}
//                         onChange={(e) => changeOrderValue(e)}
//                         type="date"
//                         name="date"
//                         id="cdate"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="cname"
//                         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                       >
//                         Remarks
//                       </label>
//                       <input
//                         value={orderValue.remarks}
//                         onChange={(e) => changeOrderValue(e)}
//                         type="text"
//                         name="remarks"
//                         id="cname"
//                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                         required
//                       />
//                     </div>
//                     <button
//                       onClick={(e) => placeOrder(e)}
//                       type="submit"
//                       className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     >
//                       Place Order
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Order;
