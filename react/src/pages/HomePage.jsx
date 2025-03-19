import React, { useState } from 'react'

import Footer from '../common/footer/Footer';

import Header from '../common/header/Header';
import Slider from '../customer/Slider';
import CategoryBody from '../customer/collections/CategoryBody';
import StandardImageList from '../trial/StandardImageList';



const HomePage = () => {
  return (
    <>
    <div className='font-[poppins] h-screen'>
    <Header/>
    <Slider/>
    <CategoryBody/>
    {/* <Newproducts/> */}
    <Footer/>
    </div>
    </>
  )
}

export default HomePage