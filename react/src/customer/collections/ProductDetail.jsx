


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './ProductDetail.css'; // Import your CSS file for this component

const ProductDetail = () => {
  const [singlePro, setSinglePro] = useState({});
  const [quant, setQuant] = useState(1);
  const [quantMess, setQuantMess] = useState("");
  const { id } = useParams();

  const changeQuantPlus = (e) => {
    if (singlePro.productquantity > quant) {
      setQuant(quant + 1);
      setQuantMess("");
    } else {
      setQuantMess("dangermessage2");
    }
  };

  const changeQuantMinus = (e) => {
    if (quant > 1) {
      setQuant(quant - 1);
      setQuantMess("");
    } else {
      setQuantMess("dangermessage1");
    }
  };

  useEffect(() => {
    async function get_single_product_only() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/get_single_product", { id: id });
        setSinglePro({
          productname: response.data.product.name,
          productprice: response.data.product.price,
          productquantity: response.data.product.quantity,
          productdescription: response.data.product.description,
          productcategory: response.data.category.name,
          productdiscount: response.data.product.discount_id,
          productimage: response.data.product.image,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    get_single_product_only();
  }, [id]);

  return (
    <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800 z-12">
      <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 md:w-1/2">
            <div className="sticky top-0 z-50 overflow-hidden">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                <img
                  src={`http://127.0.0.1:8000/images/${singlePro.productimage}`}
                  alt=""
                  className="object-cover w-full lg:h-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <div className="lg:pl-20">
              <div className="mb-8">
                <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                  {singlePro.productname}
                </h2>
                <p className="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                  {singlePro.productdescription}
                </p>
                <p className="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400">
                  <span>${singlePro.productprice}</span>
                  <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                    $1500.99
                  </span>
                </p>
                <p className="text-green-600 dark:text-green-300">
                  {singlePro.productquantity} items in stock
                </p>
              </div>

              <div className="w-32 mb-8">
                <label
                  htmlFor=""
                  className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                >
                  Quantity
                </label>
                <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                  <button
                    onClick={(e) => changeQuantMinus(e)}
                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400"
                  >
                    <span className="m-auto text-2xl font-thin">-</span>
                  </button>
                  <input
                    type="number"
                    className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                    placeholder={quant}
                  />
                  <button
                    onClick={(e) => changeQuantPlus(e)}
                    className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
                  >
                    <span className="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>

              <div
                className={`${
                  quantMess !== "" ? "flex" : "hidden"
                } items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium"></span>{" "}
                  {`${
                    quantMess === "dangermessage1"
                      ? "Cart cannot contain less than 1 item"
                      : "Cart cannot contain more items than in stock"
                  }`}
                </div>
              </div>

              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  <button className="flex items-center justify-center w-full p-4 text-white bg-blue-500 rounded-md dark:text-gray-200 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
