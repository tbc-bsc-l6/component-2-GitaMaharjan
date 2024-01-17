import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add_user = () => {
  const nav = useNavigate();
  const [status, setStatus] = useState({
    status: "",
    color: "",
  });
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const localToken = localStorage.getItem("token");

  const changeInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const submitUser = (e) => {
    e.preventDefault();
    let userData = userInfo;
    if (
      userData.fullname != "" &&
      userData.email != "" &&
      userData.password != "" &&
      userData.cpassword != ""
    ) {
      if (userData.password === userData.cpassword) {
        axios
          .post("http://127.0.0.1:8000/api/create_user_admin", userData, {
            headers: { Authorization: `${localToken}` },
          })

          .then((response) => {
            if (response.data.status === true) {
              setStatus({
                message: "User created successfully!",
                color: "text-green-600",
              });

              nav("/dashboard/users");
            } else {
              setStatus({
                message: response.data.message,
                color: "text-red-600",
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            setStatus({
              message: "An error occurred. Please try again later.",
              color: "text-red-600",
            });
          });
      } else {
        setStatus({
          message: "Your password doesn't match",
          color: "text-red-600",
        });
      }
    } else {
      setLoading(false);
      setStatus({
        message: "Please fill in all fields",
        color: "text-red-600",
      });
    }
  };
  return (
    <>
      {status.message && (
        <div className={`mb-4 p-3 rounded ${status.color} text-center`}>
          {status.message}
        </div>
      )}
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-pink rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create User
          </h1>

          <div className="mb-6 flex flex-col">
            <label htmlFor="fullname" className="text-sm text-gray-600 mb-2">
              Full Name
            </label>
            <input
              onChange={(e) => changeInfo(e)}
              value={userInfo.fullname}
              type="text"
              id="fullname"
              className="input-field p-3 border border-gray-300 rounded-md w-full max-w-md"
              name="fullname"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label
              htmlFor="email"
              className="text-sm text-gray-600 mb-2 w-full max-w-md"
            >
              Email
            </label>
            <input
              value={userInfo.email}
              onChange={(e) => changeInfo(e)}
              type="text"
              id="email"
              className="input-field p-3 border border-gray-300 rounded-md w-full max-w-md"
              name="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              value={userInfo.password}
              onChange={(e) => changeInfo(e)}
              type="password"
              id="password"
              className="input-field p-3 border border-gray-300 rounded-md w-full max-w-md"
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-6 flex flex-col">
            <label htmlFor="cpassword" className="text-sm text-gray-600">
              Confirm Password
            </label>
            <input
              value={userInfo.cpassword}
              onChange={(e) => changeInfo(e)}
              type="password"
              id="cpassword"
              className="input-field p-3 border border-gray-300 rounded-md  w-full max-w-md"
              name="cpassword"
              placeholder="Confirm your password"
            />
          </div>

          <button
            onClick={(e) => submitUser(e)}
            type="submit"
            className="w-full btn-primary bg-pink-400 py-2 px-4 text-white rounded-md hover:bg-pink-600 focus:outline-none"
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
};

export default Add_user;
