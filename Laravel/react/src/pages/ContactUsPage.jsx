import React from 'react'
import Footer from '../common/footer/Footer'
import Header from '../common/header/Header'
import ContactUs from '../customer/ContactUs'
const ContactUsPage = () => {
  return (
    <>
     <div className='font-[poppins] h-screen'>
    <Header/>
      <ContactUs/>
    <Footer/>
    </div>
    </>
  )
}

export default ContactUsPage