import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Site Name */}
        <Link to="/" className="text-white text-3xl font-bold">
          My Awesome App
        </Link>

        {/* Navigation Links */}
        <nav className="space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contacts" className="text-white hover:text-gray-300">
            Contacts
          </Link>
          <Link to="/book" className="text-white hover:text-gray-300">
            Book
          </Link>
          <Link to="/search" className="text-white hover:text-gray-300">
            Search
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;



