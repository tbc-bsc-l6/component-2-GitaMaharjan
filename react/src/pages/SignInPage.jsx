import React, { useEffect, useState } from 'react'
import Footer from '../common/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../customer/Loader';
import Header from '../common/header/Header';
import Signin from '../customer/Signin';


const SignInPage = ({isLogin}) => {
  const navigate = useNavigate();

  if(isLogin.token === true){
    navigate("/");
  }
  return (
    <div className='font-[poppins] h-screen'>
      <Signin/>
    </div>
  )
}

export default SignInPage