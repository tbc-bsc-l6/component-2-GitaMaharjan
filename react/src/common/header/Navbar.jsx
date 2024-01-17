import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [cat, setCat] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const close_cat = () => {
    setTimeout(() => {
      setCat((prev) => !prev);
    }, 2000);
  };

  return (
    <>
      <header className="bg-gray-200 p-4 md:flex md:justify-between md:items-center relative z-10">
        <div className="flex items-center justify-between">
          {/* Burger Menu Icon (Hidden on Larger Screens) */}
          <div
            className="md:hidden cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Navbar Links (Visible on Larger Screens) */}
        <ul className="hidden md:flex items-center space-x-4">
          <li className="hover:text-red-400 duration-[0.6s] p-5">
            <Link to="/home/">Beds</Link>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] p-5">
            <Link to="/home">Chairs</Link>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] p-5">
            <Link to="/home">Sofa</Link>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] p-5">
            <Link to="/home">Vases</Link>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] cursor-pointer p-5">
            <p
              onClick={() => {
                setCat(false);
                setMenuOpen(false);
              }}
              onMouseOver={() => setCat(true)}
            >
              Products
            </p>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] p-5">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="hover:text-red-500 duration-[0.6s] p-5">
            <Link to="/contactus">Contact Us</Link>
          </li>
        </ul>

        {/* Sidebar (Visible on Smaller Screens) */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-64 bg-gray-800 text-white ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="p-4">
            {/* Close Button */}
            <div
              className="cursor-pointer text-white text-xl"
              onClick={() => setMenuOpen(false)}
            >
              &times;
            </div>

            {/* Sidebar Links */}
            <ul className="mt-4 space-y-2">
              <li className="hover:text-red-400 duration-[0.6s]">
                <Link to="/home/">Beds</Link>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/home">Chairs</Link>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/home">Sofa</Link>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/home">Vases</Link>
              </li>
              <li className="hover:text-red-500 duration-[0.6s] cursor-pointer">
                <p
                  onClick={() => {
                    setCat(false);
                    setMenuOpen(false);
                  }}
                  onMouseOver={() => setCat(true)}
                >
                  Products
                </p>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/aboutus">About Us</Link>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
