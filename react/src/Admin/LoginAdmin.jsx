import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginUser } from "../authentication/authSlice";
import { Link } from "react-router-dom";
import Loader from "../customer/Loader";
import loginbg from "../assets/logo/login.jpeg";
import logo from "../assets/logo/goasis-black.png";

const LoginAdmin = () => {
  const [loading, setLoading] = useState();
  const [loginDetails, setLoginDetails] = useState({
    password: "",
    email: "",
  });

  const isLogin = useSelector((state) => state.authReducer.signin[1]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (loginDetails.email !== "" && loginDetails.password !== "") {
      const userData = {
        email: loginDetails.email,
        password: loginDetails.password,
      };

      try {
        axios
          .post("http://127.0.0.1:8000/api/adminlogin", userData)
          .then((response) => {
            console.log(response);
            if (response.data.status === "true") {
              dispatch(
                loginUser({
                  fullname: response.data.fullname,
                  email: loginDetails.email,
                  token: response.data.api_token,
                  image: response.data.image,
                  type: response.data.type,
                })
              );
              localStorage.setItem("token", response.data.api_token);
              navigate("/dashboard");
            } else if (response.data.status === "false") {
              setLoading(false);
            } else {
              setLoading("error");
            }
          });
      } catch (e) {
        setLoading("error");
      }
    } else {
      setLoading("error");
    }
  };

  const handleInputChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  return isLogin.token !== "" ? (
    <Navigate to="/dashboard" />
  ) : (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 255)", // Adjust the alpha value
      }}
    >
      <img
        src={loginbg}
        alt="Background"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(3px)",
        }}
      />
      {/* <div> */}
      <section
        className="min-h-screen flex items-stretch text-white "
        style={{ width: "500px" }}
      >
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div className="w-full py-6 z-20">
            <h1 className="text-lg text-[red]">
              {loading === false ? "Invalid Credentials" : ""}
            </h1>
            <h1 className="text-lg text-[red]">
              {loading === "error" ? "Empty Fields" : ""}
            </h1>

            <Link
              to="/home"
              className="logo flex items-center justify-center mb-4"
            >
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "calc(140px + 20px)",
                  height: "auto",
                  marginLeft: "250px",
                }}
              />
            </Link>
            <form className="my-6" onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white  text-left">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={loginDetails.email}
                  onChange={handleInputChange}
                  className="py-2 px-4 rounded-lg bg-gray-700 text-white mt-2"
                  style={{ width: "400px" }}
                />
              </div>

              <div className="flex flex-col mt-4">
                <label htmlFor="password" className="text-white text-left">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginDetails.password}
                  onChange={handleInputChange}
                  className="py-2 px-4 rounded-lg bg-gray-700 text-white mt-2"
                  style={{ width: "400px" }}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-10 mr-10"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
      {loading === true && (
        <>
          <Loader type={"two"} />
        </>
      )}
    </div>
  );
};

export default LoginAdmin;
