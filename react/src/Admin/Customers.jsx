import React, { useState, useEffect } from "react";
import http from "../http";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./pagination.css";

function Customers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = (page = 1) => {
    http
      .get(`/users?per_page=10&page=${page}`)
      .then((res) => {
        setUsers(res.data.users);
        setPagination(res.data.pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const handlePageChange = (selectedPage) => {
    fetchAllUsers(selectedPage.selected + 1);
  };
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              S.N.
            </th>
            <th scope="col" className="px-6 py-3">
              FullName
            </th>

            <th scope="col" className="px-6 py-3">
              Email
            </th>

            <th scope="col" className="px-6 py-3">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className={productItem.length === 0 ? 'block': 'hidden'}><td>No Searches Found</td></tr> */}
          {users.map((user, id) => {
            return (
              <tr key={user.nanoid}>
                <td className="px-6 py-4">{id + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.fullname}
                </th>

                <td className="px-6 py-4">{user.email}</td>

                <td className="px-6 py-4">
                  {user.created_at ? user.created_at.substring(0, 10) : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {pagination.total > 0 && (
        <div className="pagination">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pagination.last_page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
          />
        </div>
      )}
    </>
  );
}

export default Customers;
