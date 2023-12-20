
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineLogin } from 'react-icons/ai';
import logo from "../../../assets/images/logo.png";
import chair from  "../../../assets/images/chair.png";
import { useEffect, useRef, useState } from "react";
import DropdownItem from './DropdownItem';
import "./header.css";



const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  }
  return (
    <header className="bg-gray-100" style={{ height: '80px' }}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo w-48 h-20" />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {/* ********************************************************* */}

        <Link to="/collections">
        <div className="dropdown">
            <button onClick={handleDropdownToggle}>Collection</button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="dropdown-row">
                  <DropdownItem className="dropdown-column" label="table" href="/table" imageSrc={logo} topic="A spot for midnight snacks " />
                  <DropdownItem className="dropdown-column" label="chair" href="/chair" imageSrc={chair} topic="Bench seats offer coziness " />
                  <DropdownItem className="dropdown-column" label="sofa" href="/sofa" imageSrc={logo} topic="the lounge piece with soft" />
              
                </div>
                <div className="dropdown-row">
                  <DropdownItem className="dropdown-column" label="decor" href="/decor" imageSrc={logo} topic="Life for decoration" />
                  <DropdownItem className="dropdown-column" label="lighting" href="/lighting" imageSrc={logo} topic="live with the warm lightings" />
                  <DropdownItem  className="dropdown-column" label="vases" href="/vases" imageSrc={logo} topic="Additional beauty to the room" />
              
                </div>
                <div className="dropdown-row">

               <DropdownItem className="dropdown-column" label="planters" href="/planters" imageSrc={logo} topic="planters with a sharpness" />
                  <DropdownItem className="dropdown-column" label="bedroom" href="/bedroom" imageSrc={logo} topic="bid farewell to nights of counting  sheep" />

                </div>
                
              </div>
            )}
          </div>
        </Link>

        <Link to="/about" className="text-black hover:text-gray-800">
            About Us
          </Link>
          <Link to="/contacts" className="text-black hover:text-gray-800">
            Contacts
          </Link>
          <Link to="/search" className="text-black hover:text-gray-800 flex items-center">
            <AiOutlineSearch size={20} />
          </Link>
          <Link to="/wishlist" className="text-black hover:text-gray-800 flex items-center">
            <AiOutlineHeart size={20} />
          </Link>
          <Link to="/cart" className="text-black hover:text-gray-800 flex items-center">
            <AiOutlineShoppingCart size={20} />
          </Link>
        </nav>

        {/* Login Link with Icon */}
        <div className="flex items-center">
          <Link to="/login" className="text-black hover:text-gray-800 flex items-center">
            <AiOutlineLogin size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;