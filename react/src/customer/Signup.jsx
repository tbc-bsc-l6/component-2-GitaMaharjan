

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo/goasis-black.png';
import { loginUser } from '../authentication/authSlice';
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Signup = () => {
  //redux dispatch
  const dispatch = useDispatch();

  let isLoggedin = useSelector((state) => {
    return state.authReducer.signin[0];
  });

  //router navigate
  const navigate = useNavigate();

  //loading state
  const [loading, setLoading] = useState(false);

  //basic states for data
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState({
    status: '',
    color: '',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator

    const userData = {
      fullname: fullname,
      email: email,
      password: password,
      password_confirmation: confirmpassword,
    };

    if (fullname !== '' && email !== '' && password !== '' && confirmpassword !== '') {
      axios.post('http://127.0.0.1:8000/api/signup', userData).then((response) => {
        dispatch(
          loginUser({
            fullname: fullname,
            email: email,
            token: response.data.api_token,
            image: response.data.image,
            type: 'customer',
          })
        );
        localStorage.setItem('token', response.api_token);
        navigate('/');
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setStatus({ status: response.data.message, color: 'blue-700' });
        setLoading(false); // Stop loading indicator
        navigate('/signin');
      });
    } else {
      setStatus({ status: 'Some of the fields are empty', color: 'red-700' });
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <>
      {isLoggedin.token !== '' ? (
        <Navigate to="/home" />
      ) : (
        <form onSubmit={(event) => submitHandler(event)} className="mt-0 mb-8 rounded-lg overflow-hidden">
          <div className="bg[#e0ceb8] min-h-screen flex flex-col items-center justify-center">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div
                className="bg-pink px-6 py-8 rounded shadow-md text-black w-full"
                style={{ borderRadius: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
              >
                <p className={`w-[100%] mx-auto text-center text-lg mb-4 text-${status.color}`}>
                  {status.status}
                </p>
                <Link to="/home" className="logo flex items-center justify-center mb-4">
                  <img src={logo} alt="Logo" style={{ width: 'calc(140px + 2px)', height: 'auto' }} />
                </Link>

                <h1 className="mb-8 text-xl text-center font-semibold text-gray-800">Sign up for free</h1>
                <input
                  type="text"
                  className="block border border-gray-300 w-full p-3 rounded shadow-md mb-4 text-sm"
                  name="fullname"
                  placeholder="Full Name"
                  value={fullname}
                  onChange={(event) => {
                    setFullname(event.target.value);
                  }}
                />

                <input
                  type="text"
                  className="block border border-gray-300 w-full p-3 rounded shadow-md mb-4 text-sm"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />

                <input
                  type="password"
                  className="block border border-gray-300 w-full p-3 rounded shadow-md mb-4 text-sm"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <input
                  type="password"
                  className="block border border-gray-300 w-full p-3 rounded shadow-md mb-4 text-sm"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-[#81a2f0] text-white hover:bg-[#a7bdf2] focus:outline-none my-1"
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Sign Up'}
                </button>
              </div>

              <div className="text-gray-600 mt-6">
                Already a member?{' '}
                <Link className="no-underline border-b border-blue-500 text-blue-500" to="/signin">
                  Sign in
                </Link>
                .
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Signup;