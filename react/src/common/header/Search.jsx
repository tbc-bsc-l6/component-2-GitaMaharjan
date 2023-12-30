import { Link } from 'react-router-dom'
import {useState, useRef} from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch} from 'react-icons/fa';
import logo from "../../assets/logo/goasis-black.png";
import "./Header.css"


const Search = () => {

  const dispatch = useDispatch();
  let isLogin = useSelector((state)=>{
    return state.authReducer.signin[0];
  })

  const [hide, setHide] = useState(false);

  // fixed Header
  // window.addEventListener("scroll", function () {
  //   const search = document.querySelector(".search");
  //   search.classList.toggle("active", window.scrollY > 100);
  // });

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>

          <Link to="/home" className='logo width '>
            <img src={logo} alt='' />
          </Link>


          <div className='search-box f_flex'>
            <FaSearch className="icon" />
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>


          <div className='flex flex-row justify-between md:gap-[1.5em] gap-[1em] items-center'>
                    {
                      isLogin.token === "" ?
                    <Link className='hover:text-red-500 duration-[0.6s]' to="/signin">
                    <button type="button" className="bg-[#1da1f2] text-white inline-flex pl-3.5 pr-5 py-2 duration-[0.5] hover:bg-[#59bbf8] font-medium rounded-md items-center text-sm space-x-3 text-[16px">
              <span>Sign In</span>
                  </button>
                    </Link> : <Link className='w-[40px] hover:text-red-500 duration-[0.6s] rounded-full' to="/userprofile">
                        <img className='w-[38px] h-[38px] rounded-full' src={`http://127.0.0.1:8000/assets/${isLogin.image}`} alt="" />
                        </Link>  }
                    <Link className='hover:text-green-500 duration-[0.6s]' to="/cartpage">
      <FontAwesomeIcon className='text-[1.5rem]' icon={faShoppingBag} />
      <span className='rounded text-[16px] text-green-500'>0</span>
    </Link>
                    <FontAwesomeIcon onClick={()=>{setHide(!hide)}} className={`w-8 h-8 md:hidden ${hide? "hidden": 'block'}`} icon={faBars} />
                    <FontAwesomeIcon onClick={()=>{setHide(!hide)}} className={`w-8 h-8 md:hidden ${hide? "block": 'hidden'}`} icon={faXmark} />

          </div>
        </div>
      </section>
    </>
  );
}

export default Search;
