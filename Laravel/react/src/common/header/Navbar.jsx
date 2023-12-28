
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [cat, setCat] = useState(false);

  const close_cat = () => {
    setTimeout(() => {
      setCat((prev) => !prev);
    }, 2000);
  };

  return (
    <>
      <header
        onClick={() => setCat(false)}
        className="w-full text-white bg-[#f5f6f7] h-[20px] flex justify-center items-center p-4 z-10"
      >
          <ul className="flex align-middle text-black text-[12px] justify-between items-center md:flex-row flex-col md:gap-[4em] gap-[1em] z-999999">
              <li className="hover:text-red-400 duration-[0.6s]">
                <Link to="/home">Beds</Link>
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
                  onClick={() => setCat(false)}
                  onMouseOver={() => setCat(true)}
                >
                  Products
                </p>
              </li>
              <li className="hover:text-red-500 duration-[0.6s]">
                <Link to="/aboutus">About Us</Link>               
                 <Link to="/contactus">Contact Us</Link>

              </li>
            </ul>
      </header>
    </>
  );
};

export default Navbar;
