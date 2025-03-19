import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../customer/Loader";

const Edit_user = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
  });
  const localToken = localStorage.getItem("token");
  console.log(id);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/get_user_admin/" + id, {
        headers: { Authorization: `${localToken}` },
      })
      .then((response) => {
        console.log(response);
        setUserInfo(response.data.user);
      });
  }, []);
  const nav = useNavigate();

  const changeInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const submitUser = (e) => {
    e.preventDefault();

    if (userInfo.fullname !== "" && userInfo.email !== "") {
      axios
        .put("http://127.0.0.1:8000/api/edit_user_admin", userInfo, {
          headers: { Authorization: `${localToken}` },
        })
        .then((response) => {
          if (response.data.status === true) {
            nav("/dashboard/users");
          } else {
            setStatus(response.data.message);
          }
        })
        .catch((error) => {
          setStatus("An error occurred. Please try again later.");
        });
    } else {
      setStatus("Please fill in all fields");
    }
  };
  return (
    <>
      {status && (
        <div className="mb-4 p-3 rounded bg-red-200 text-red-800 text-center">
          {status}
        </div>
      )}
      <div className="flex items-center justify-center min-h-screen">
        {/* Status Message */}

        {userInfo.fullname === "" ? (
          <div />
        ) : (
          <div className="bg-pink-100 min-h-[60vh] flex items-center justify-center">
            <div className="container max-w-md mx-auto flex-1 flex items-center justify-center px-4">
              <div className="bg-pink p-8 rounded shadow-md text-black w-full">
                <h1 className="mb-6 text-2xl text-center font-bold">
                  Edit User
                </h1>
                <div className="mb-5 flex flex-row">
                  <label
                    htmlFor="usertype"
                    className="text-sm text-gray-600 mb-2 w-full max-w"
                  >
                    FullName{" "}
                  </label>
                  <input
                    onChange={(e) => changeInfo(e)}
                    value={userInfo.fullname}
                    type="text"
                    className="input-field p-3 border border-gray-300 rounded-md"
                    name="fullname"
                    placeholder="Full Name"
                  />
                </div>
                <div className="mb-5 flex flex-row">
                  <label
                    htmlFor="usertype"
                    className="text-sm text-gray-600 mb-2 w-full max-w-md"
                  >
                    Gmail{" "}
                  </label>
                  <input
                    value={userInfo.email}
                    onChange={(e) => changeInfo(e)}
                    type="text"
                    className="input-field p-3 border border-gray-300 rounded-md"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-5 flex flex-row">
                  <label
                    htmlFor="usertype"
                    className="text-sm text-gray-600 mb-2 w-full max-w-md"
                  >
                    User Type
                  </label>
                  <input
                    onChange={(e) => changeInfo(e)}
                    value="admin"
                    type="text"
                    className="input-field p-3 border border-gray-300 rounded-md"
                    name="usertype"
                    placeholder="Full Name"
                  />
                </div>
                <button
                  onClick={(e) => {
                    submitUser(e);
                  }}
                  type="submit"
                  className="w-full btn-primary bg-pink-400 py-2 px-4 text-white rounded-md hover:bg-pink-600 focus:outline-none"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Edit_user;
