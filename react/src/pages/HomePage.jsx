import React, { useState } from 'react'

import Footer from '../common/footer/Footer';

import Header from '../common/header/Header';
import Newproducts from '../customer/Newproducts';
import Slider from '../customer/Slider';



const HomePage = () => {
  return (
    <>
    <div className='font-[poppins] h-screen'>
    <Header/>
    <Slider/>
    {/* <Newproducts/> */}
    <Footer/>
    </div>
    </>
  )
}

export default HomePage