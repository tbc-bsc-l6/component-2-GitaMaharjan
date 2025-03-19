import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSignInAlt } from "react-icons/fa";

import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import logo from "../../assets/logo/goasis-white.png";
import "./Header.css";
import axios from "axios";

const Search = () => {
  const nav = useNavigate();
  const [search, setSearch] = useState("");

  const changeTerm = (e) => {
    setSearch(e.target.value);
  };

  function searchItem(e) {
    if (e.key === "Enter") {
      nav(`/search/` + search);
    }
  }

  const [hide, setHide] = useState(false);

  const [quantity, setQuantity] = useState(0);

  const userLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });
  let cartItems = useSelector((state) => {
    return state.cartReducer.cart_items;
  });
  useEffect(() => {
    if (userLogin.id != "") {
      axios
        .post("http://127.0.0.1:8000/api/productcounts-cart-id", {
          id: userLogin.id,
        })
        .then((response) => {
          console.log(response);
          setQuantity(response.data.num);
        });
    }
  }, [userLogin.id, cartItems]);
  /**************************** */

  return (
    <>
      <section className="search bg-[#1f2b40] py-2">
        <div className="container c_flex">
          <Link to="/home" className="logo width ">
            <img src={logo} alt="" />
          </Link>
          {/*  */}

          <input
            value={search}
            onChange={(e) => changeTerm(e)}
            onKeyUp={(e) => searchItem(e)}
            type="text"
            placeholder="Search and hit enter..."
            className="p-1 m-10 bg-blue-100"
          />
          <FaSearch className="icon" style={{ color: "white" }} />

          <div className="flex flex-row justify-between md:gap-[1.5em] gap-[1em] items-center">
            {userLogin.token === "" ? (
              <Link className="hover:text-red-500 duration-[0.6s]" to="/signin">
                <button
                  type="button"
                  className=" bg-[#b8cff5] hover:bg-pink-200 text-white inline-flex pl-2 pr-3 py-1 duration-300 font-medium rounded-md items-center text-sm space-x-1 focus:outline-none focus:ring focus:border-pink-300"
                >
                  <FaSignInAlt className="text-lg " />
                </button>
              </Link>
            ) : (
              <Link
                className="w-[40px] hover:text-red-500 duration-[0.6s] rounded-full"
                to="/userprofile"
              >
                <img
                  className="w-[38px] h-[38px] rounded-full"
                  src={`http://127.0.0.1:8000/assets/${userLogin.image}`}
                  alt=""
                />
              </Link>
            )}
            <Link
              className="hover:text-green-500 duration-[0.6s] flex flex-row items-center"
              to="/cartpage"
            >
              <span className="rounded text-[16px] text-white">{quantity}</span>
              <FontAwesomeIcon
                className="text-[1.5rem]"
                icon={faShoppingBag}
                style={{ color: "white" }}
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
