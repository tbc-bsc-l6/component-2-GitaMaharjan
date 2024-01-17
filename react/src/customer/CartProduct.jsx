import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { delete_cart_item } from "../authentication/CartSlice";
import axios from "axios";
import PropTypes from "prop-types";

const CartProduct = ({
  cartInfo,
  proQuant,
  status,
  id,
  quantity,
  image,
  name,
  description,
  price,
  temp_id,
  category,
}) => {
  let singleProductPrice = quantity * price;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });
  const remove_item = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log(id);
    if (userLogin.id != "") {
      dispatch(delete_cart_item({ id: id }));
      axios
        .delete("http://127.0.0.1:8000/api/delete-product-cart/" + id)
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            status();
          }
        });
    }
  };

  return (
    <div className=" w-200 md:w-1/2 relative flex flex-wrap items-center p-4 mb-4 border rounded-md bg-gray-200 dark:bg-gray-800 border-opacity-40">
      <div className="w-full h-44 md:w-40 md:h-36 overflow-hidden rounded-md mr-4">
        <img
          src={
            image.includes("https")
              ? `${image}`
              : `http://127.0.0.1:8000/images/${image}`
          }
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between w-full px-4 md:w-56">
        <div className="mb-4">
          <a
            className="block text-lg font-medium hover:underline dark:text-gray-400"
            href="#"
          >
            {name}
          </a>
          <div className="flex items-center mt-2">
            <p className="mr-4 text-sm font-medium dark:text-gray-400">
              <span>Category:</span>
              <span className="ml-2 text-gray-400">{category}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium text-gray-800">
            Items: {quantity}
          </span>
        </div>
        <span className="text-l font-medium text-gray-800">
          Per Product: {price}
        </span>
      </div>
      <span className="text-xl font-medium text-green-600 dark:text-blue-400 ml-4">
        <span className="text-sm">Rs. </span>
        {singleProductPrice}
      </span>
      <button
        data-id={temp_id}
        onClick={(e) => remove_item(e)}
        className="text-red-500 mt-4 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 ml-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
        </svg>
      </button>
    </div>
  );
};
CartProduct.propTypes = {
  cartInfo: PropTypes.any,
  proQuant: PropTypes.any,
  status: PropTypes.any,
  id: PropTypes.any,
  quantity: PropTypes.any,
  image: PropTypes.any,
  name: PropTypes.any,
  description: PropTypes.any,
  price: PropTypes.any,
  temp_id: PropTypes.any,
  category: PropTypes.any,
};

export default CartProduct;
