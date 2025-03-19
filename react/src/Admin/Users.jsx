import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NoAcess from "./NoAcess";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const localToken = localStorage.getItem("token");
  const [forbiddenPage, setForbiddenPage] = useState(false);

  const deleteUser = (e) => {
    let id = e.target.dataset.id;
    axios
      .delete("http://127.0.0.1:8000/api/delete_user_admin/" + id, {
        headers: { Authorization: `${localToken}` },
      })
      .then((response) => {
        // console.log(response);
        setStatus(true);
      });
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_users_admin", {
        headers: { Authorization: `${localToken}` },
      })
      .then((response) => {
        console.log(response);
        if (response.data.error === "Unauthorized") {
          setForbiddenPage(true);
          setUsers([]);
        } else {
          let arr = response.data.users;
          setUsers(arr);
          setStatus(false);
        }
      });
  }, [status]);

  return (
    <>
      {forbiddenPage === false ? (
        <div className="bg-pink dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            Administrative Users
          </h1>

          <div className="overflow-x-auto ">
            {users.length === 0 ? (
              <div className="text-lg text-center text-gray-600 dark:text-gray-400">
                No users found
              </div>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-400">
                <thead className="text-xs bg-pink dark:bg-pink-700 dark:text-gray-400">
                  <tr>
                    <th className="px-6 py-3">S.N.</th>
                    <th className="px-6 py-3">Full name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">User Role</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr
                      key={user.id}
                      className={`${
                        i % 2 === 0
                          ? "bg-pink dark:bg-gray-800"
                          : "bg-pink dark:bg-gray-900"
                      } border-b dark:border-gray-700`}
                    >
                      <td className="px-6 py-4 font-medium">{i + 1}</td>
                      <td className="px-6 py-4">{user.fullname}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.usertype}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/dashboard/edit_user/${user.id}`}
                          className="text-blue-600 dark:text-blue-500 hover:underline mr-4"
                        >
                          Edit
                        </Link>
                        <Link
                          data-id={user.id}
                          onClick={(e) => deleteUser(e)}
                          className="text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete User
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex justify-end">
            <Link to="/dashboard/add_user">
              <button className="bg-pink-500 hover:bg-pink-600 mt-5 mr-25 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-green active:bg-green-800">
                Add Users
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <NoAcess />
      )}
    </>
  );
};

export default Users;
