import React from 'react'
import Footer from '../common/footer/Footer';
import UserProfile from '../customer/UserProfile';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../common/header/Header';
const UserProfilePage = () => {
  let isLogin = useSelector((state)=>{
    return state.authReducer.signin;
  })
  return (
    isLogin.token === ""? <Navigate to="/" />:
    <div className='font-[poppins] h-screen'>
    <Header/>
    <UserProfile/>
    <Footer/>
    </div>
  )
}

export default UserProfilePage