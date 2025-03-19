/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function makeObjectsUnique(arr, property) {
  const uniqueValues = new Set();
  return arr.filter((obj) => {
    if (!uniqueValues.has(obj[property])) {
      uniqueValues.add(obj[property]);
      return true;
    }
    return false;
  });
}

const OrderDetails = () => {
  const [orderValue, setOrderValue] = useState({
    name: "",
    address: "",
    date: "",
    remarks: "",
    number: "",
  });
  const nav = useNavigate();

  const changeOrderValue = (e) => {
    setOrderValue({ ...orderValue, [e.target.name]: e.target.value });
  };
  const [cartList, setCartList] = useState([]);
  const cartInfo = (quant, id) => {
    let arr = [{ quant: quant, id: id }, ...cartList];
    setCartList((prev) => makeObjectsUnique(arr, "id"));
  };

  const userLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });
  console.log(userLogin);

  const placeOrder = (e) => {
    e.preventDefault();

    // Validation check
    if (
      orderValue.name !== "" &&
      orderValue.address !== "" &&
      orderValue.remarks !== "" &&
      orderValue.date !== "" &&
      orderValue.number !== ""
    ) {
      // Perform cart updates
      cartList.forEach(({ quant, id }) => {
        axios
          .put("http://127.0.0.1:8000/api/updatecart", {
            quant: quant,
            id: id,
          })
          .then((response) => {
            // Handle successful update if needed
          })
          .catch((error) => {
            // Handle update error
            alert(error.message);
          });
      });

      // Place order
      axios
        .post("http://127.0.0.1:8000/api/add-to-order", {
          address: orderValue.address,
          date: orderValue.date,
          remarks: orderValue.remarks,
          number: orderValue.number,
          name: orderValue.name,
          login: userLogin.id,
        })
        .then((response) => {
          // Handle successful order placement
          let value = response.data.order_id;
          nav("/orderpage/" + value);
        })
        .catch((error) => {
          // Handle validation errors
          if (error.response && error.response.data.errors) {
            const validationErrors = error.response.data.errors;
            // Display validationErrors to the user or handle accordingly
            alert(validationErrors);
          } else {
            // Handle other types of errors
            alert(error.message);
          }
        });
    } else {
      // Handle validation error - inform the user that required fields are missing
      alert("Validation failed. Please fill in all required fields.");
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-screen w-1500">
          <div className="relative p-4 max-h-full" style={{ width: "1000px" }}>
            {/* <div className="relative bg-pink rounded-lg shadow dark:bg-gray-700"> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Order Details
              </h3>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" action="#">
                <div className="flex">
                  <div className="flex-1 mr-4">
                    <label
                      htmlFor="cname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Recipient's Name
                    </label>
                    <input
                      value={orderValue.name}
                      onChange={(e) => changeOrderValue(e)}
                      type="text"
                      name="name"
                      id="cname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <label
                      htmlFor="cnum"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Recipient's Number
                    </label>
                    <input
                      value={orderValue.number}
                      onChange={(e) => changeOrderValue(e)}
                      type="number"
                      name="number"
                      id="cname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-1 mr-4">
                    <label
                      htmlFor="cadd"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Delivery Address
                    </label>
                    <input
                      value={orderValue.address}
                      onChange={(e) => changeOrderValue(e)}
                      type="text"
                      name="address"
                      id="cadd"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    <label
                      htmlFor="cdate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Delivery date
                    </label>
                    <input
                      value={orderValue.date}
                      onChange={(e) => changeOrderValue(e)}
                      type="date"
                      name="date"
                      id="cdate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Order Notes
                  </label>
                  <input
                    value={orderValue.remarks}
                    onChange={(e) => changeOrderValue(e)}
                    type="text"
                    name="remarks"
                    id="cname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>

                <button
                  onClick={(e) => placeOrder(e)}
                  type="submit"
                  className="w-full text-white bg-pink-400 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default OrderDetails;
