import React, { useEffect, useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
// import "./order.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const Order = () => {
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState();
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState([]);
  const [pro, setPro] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/get-orders/" + id).then((response) => {
      console.log(response);
      setOrders(response.data.orders[0]);
      setPro(response.data.items);
      setItems(response.data.order_item);
      setCat(response.data.cat);
      setLoader(false);
    });
  }, []);
  console.log(orders);
  let subTotal = 0;
  let discountTotal = 0;
  const userDetail = useSelector((state) => {
    return state.authReducer.signin[0];
  });
  console.log(userDetail);
  return id === undefined ? (
    <Navigate to="/" />
  ) : loader === true ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div>
        <div className="flex items-center justify-center">
          <div className="text-center font-bold">Goasis</div>
        </div>
        <div>
          <div>
            <div>
              <span className="text-sm text-gray-600 align-middle">To:</span>
              <span className="text-600 text-110 text-blue-500 align-middle">
                {userDetail.fullname}
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 align-middle">
                Number:
              </span>
              <span className="text-600 text-110 text-blue-500 align-middle">
                {orders.number}
              </span>
            </div>
            <div className="text-grey-m2">
              {/* <div className="my-1">Street, City</div>
              <div className="my-1">State, Country</div>
              <div className="my-1">
                <i className="fa fa-phone fa-flip-horizontal text-secondary"></i>{" "}
                <b className="text-600">111-111-111</b>
              </div> */}
            </div>
          </div>

          <div className="text-95 sm:col-span-6 self-start sm:flex justify-end">
            <hr className="sm:hidden" />
            <div className="text-gray-600">
              <div className="my-2">
                <i className="fas fa-circle text-blue-500 text-xs mr-1"></i>{" "}
                <span className="font-semibold text-90">Invoice ID:</span>#
                {orders.order_no}
              </div>

              <div className="my-2">
                <i className="fas fa-circle text-blue-500 text-xs mr-1"></i>{" "}
                <span className="font-semibold text-90">Delivery Date:</span>{" "}
                {orders.delivery_date}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="row border-b-2 brc-default-l2"></div>

          <div className="table-responsive">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="text-black">
                  <th className=" px-6 py-3  opacity-2">S.N</th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3" width="150">
                    Unit Price(Rs)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount(Rs)
                  </th>
                  <th scope="col" className="px-6 py-3" width="140">
                    Amount(Rs)
                  </th>
                </tr>
              </thead>

              <tbody className="text-95 text-secondary-d3">
                {pro.map((item, i) => {
                  subTotal += item.price;
                  let discountedPrice =
                    item.price - (item.price * item.discount_id) / 100;
                  discountTotal += (item.price * item.discount_id) / 100;
                  return (
                    <tr
                      key={id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {i + 1}
                      </td>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </td>
                      <td className="px-6 py-4"> {cat[i]}</td>
                      <td className="px-6 py-4 text-95">
                        {" "}
                        {items[i].quantity}
                      </td>
                      <td className=" px-6 py-4  text-secondary-d2">
                        {" "}
                        {item.price}
                      </td>
                      <td className="px-6 py-4  text-secondary-d2">
                        {" "}
                        {item.discount_id}{" "}
                      </td>
                      <td className="px-6 py-4  text-secondary-d2">
                        {" "}
                        {discountedPrice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row mt-16">
            <div className="sm:w-7/12 text-grey-d2 text-base mt-2 sm:mt-0"></div>

            <div className="sm:w-5/12 text-gray-600 text-90 order-first sm:order-last space-y-4">
              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white leading-4 text-gray-800">
                  SubTotal:
                </p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                  Rs. {subTotal}
                </p>
              </div>

              <div className="flex justify-between items-center w-full">
                <p className="text-base dark:text-white leading-4 text-gray-800">
                  Discount Amount:
                </p>
                <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                  -{discountTotal}
                </p>
              </div>

              <div className="flex items-center bg-blue-200 p-5 my-10">
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Total Amount
                  </p>

                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    Rs. {subTotal - discountTotal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="flex justify-between mt-16">
            <div className="flex-shrink-0">
              <span className="text-secondary-d1 text-105">
                Thank you for your order
              </span>
            </div>
            <div className="flex-shrink-0">
              {/* <div className="flex items-center bg-blue-200 p-5 my-10"> */}
              <Link
                to=""
                className="btn btn-info btn-bold px-4 float-right mt-3 mt-lg-0"
              >
                Pay Now
              </Link>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
