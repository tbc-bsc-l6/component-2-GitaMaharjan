import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const OrdersList = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get-order-admin", {
        params: { per_page: 5, page: currentPage },
      })
      .then((response) => {
        const ordersData = response.data.orders;
        setOrderDetails(ordersData);
        setOrderItems(response.data.orderItem);

        // Set pageCount based on the total pages from Laravel's pagination response
        const totalPages = ordersData.total_pages || 1;
        setPageCount(totalPages);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, [loading, currentPage]);

  const handlePageChange = (selectedPage) => {
    console.log("Selected Page:", selectedPage.selected + 1);

    setCurrentPage(selectedPage.selected + 1); // Adjust for 1-based index
  };
  //   const income = itemPro.price * itemPro.quantity;
  return (
    <>
      <div>
        <div className="flex mb-4 text-2xl"></div>
        <div className="relative overflow-x-auto shadow-md rounded-lg sm:rounded-lg">
          {orderDetails.length === 0 ? (
            <div>No orders available</div>
          ) : (
            <>
              <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
                <thead className="text-l text-white bg-black dark:bg-white dark:text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 ">
                      S.N.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Order Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Quantity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product Discount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      User Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivery Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Income
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delivery Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Recipient Name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.map((pro, id) => {
                    console.log("Rendered Data:", pro); // Log rendered data
                    return (
                      <tr key={id} className="">
                        <td className="px-6 py-4">{id + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {orderDetails[id].order_Main.order_no}
                        </th>
                        <td className="px-6 py-4">
                          {orderDetails[id].products.name}
                        </td>
                        <td className="px-6 py-4">
                          <img
                            className="w-16 h-16"
                            src={`http://127.0.0.1:8000/images/${orderDetails[id].products.image}`}
                            alt="Not available"
                          />
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].products.quantity}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].products.price}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].products.discount_id}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].order_Main.user_id}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].order_Main.delivery_date}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].products.price *
                            orderDetails[id].products.quantity -
                            orderDetails[id].products.discount_id / 100}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].order_Main.address}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].order_Main.number}
                        </td>
                        <td className="px-6 py-4">
                          {orderDetails[id].order_Main.name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersList;
