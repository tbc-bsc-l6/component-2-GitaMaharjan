import React, { useEffect, useState } from 'react'
import Footer from '../common/footer/Footer';
import Loader from '../customer/Loader';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header/Header';
import Signup from '../customer/Signup';

const SignUpPage = () => {

  return (
    // isLogin === true ? <Loader/> :
    <div className='font-[poppins] h-screen'>
      <Signup/>
    </div>
  )
}

export default SignUpPage
