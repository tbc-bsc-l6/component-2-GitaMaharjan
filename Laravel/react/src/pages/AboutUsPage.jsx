import React from 'react'
import Footer from '../common/footer/Footer'
import { Link } from 'react-router-dom'
import Header from '../common/header/Header'
import AboutUs from '../customer/AboutUs';

const AboutUsPage = () => {
   
  return (
    <div className='font-[poppins] h-screen'>
    <div>
      <Header/>
        <AboutUs/>
      <Footer/>
    </div>
    </div>
  )
}

export default AboutUsPage
