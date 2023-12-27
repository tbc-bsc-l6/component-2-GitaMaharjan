import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginUser } from '../authentication/authSlice';
import { Link } from 'react-router-dom';
import Loader from '../customer/Loader';
import loginbg from "../assets/logo/login.jpeg";


const LoginAdmin = () => {
  const [loading, setLoading] = useState();
  const [loginDetails, setLoginDetails] = useState({
    password: '',
    email: '',
  });

  const isLogin = useSelector((state) => state.authReducer.signin[1]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (loginDetails.email !== '' && loginDetails.password !== '') {
      const userData = {
        email: loginDetails.email,
        password: loginDetails.password,
      };

      try {
        axios.post('http://127.0.0.1:8000/api/adminlogin', userData).then((response) => {
          console.log(response);
          if (response.data.status === 'true') {
            dispatch(
              loginUser({
                fullname: response.data.fullname,
                email: loginDetails.email,
                token: response.data.api_token,
                image: response.data.image,
                type: 'admin',
              })
            );
            localStorage.setItem('token', response.data.api_token);
            navigate('/dashboard');
          } else if (response.data.status === 'false') {
            setLoading(false);
          } else {
            setLoading('error');
          }
        });
      } catch (e) {
        setLoading('error');
      }
    } else {
      setLoading('error');
    }
  };

  const handleInputChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    isLogin.token !== '' ? (
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
        <section className="min-h-screen flex items-stretch text-white " style={{width:'500px'}} >
          <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" >
            <div className="w-full py-6 z-20">
              <h1 className="text-lg text-[red]">{loading === false ? 'Invalid Credentials' : ''}</h1>
              <h1 className="text-lg text-[red]">{loading === 'error' ? 'Empty Fields' : ''}</h1>

              <h1 className="my-6">
                <svg viewBox="0 0 247 31" className="w-auto h-7 sm:h-8 inline-flex">
                  <path fill="rgba(99,102,241, .8)" fillRule="evenodd" clipRule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#06B6D4"></path><path fill="#fff" fillRule="evenodd" clipRule="evenodd" d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l2.046 7.028h.065l2.027-7.028h3.937l-3.758 11.72-3.79-11.72h3.878l-1.889-6.684-3.71 10.017h-3.885zm20.848-8.002c3.732 0 6.622 2.21 6.622 5.15 0 1.224-.456 2.184-1.288 2.83v.065c.927.616 1.354 1.841 2.314 5.226.129.487.194 1.288.194 2.272 0 3.878-.487 6.99-2.882 8.812-1.448 1.163-3.462 1.708-5.848 1.708-4.327 0-7.974-2.084-9.22-5.844h-.065l1.907 7.861H139.98c1.708-.065 3.387-.259 5.004-.583 1.2-.194 2.34-.547 3.431-1.078 1.942-1.448 2.947-3.646 2.947-6.484 0-1.504-.19-2.84-.583-3.946-.129-.547-.324-1.075-.548-1.536h-7.84c.065-.65.129-1.289.129-1.908.013-2.694-1.078-4.843-3.034-5.528 1.354-.454 2.66-.844 3.991-1.163a5.33 5.33 0 014.84 5.064z"></path>
                </svg>
              </h1>

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
                    className="py-2 px-4 rounded-lg bg-gray-700 text-white mt-2" style={{width:"400px"}}
                  />
                </div>

                <div className="flex flex-col mt-4">
                  <label htmlFor="password" className="text-white text-left" >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginDetails.password}
                    onChange={handleInputChange}
                    className="py-2 px-4 rounded-lg bg-gray-700 text-white mt-2" style={{width:"400px"}}
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

      </div>
    )
  );
};

export default LoginAdmin;
