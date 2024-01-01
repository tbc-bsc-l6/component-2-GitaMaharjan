/* eslint-disable react/jsx-key */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_cart_item, delete_cart_item } from "../authentication/CartSlice";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CartProduct from "./CartProduct";

// function makeObjectsUnique(arr, property) {
//   const uniqueValues = new Set();
//   return arr.filter((obj) => {
//     if (!uniqueValues.has(obj[property])) {
//       uniqueValues.add(obj[property]);
//       return true;
//     }
//     return false;
//   });
// }

function makeObjectsUnique(arr, property) {
  const uniqueValues = new Set();
  return arr.reduce((uniqueObjects, obj) => {
    if (!uniqueValues.has(obj[property])) {
      uniqueValues.add(obj[property]);
      uniqueObjects.push(obj);
    }
    return uniqueObjects;
  }, []);
}

function setProductsForCart(newProducts, cartProducts, categories) {
  return newProducts.map((product, index) => {
    const {
      id,
      image,
      name,
      description,
      discount_id: discount,
      price,
      category_id,
      quantity: proQuantity,
    } = product;

    const { quantity, id: temp_id } = cartProducts[index];
    const { name: catname } = categories[index];

    return {
      id,
      image,
      quantity,
      name,
      description,
      discount,
      price,
      category_id,
      catname,
      temp_id,
      proQuantity,
    };
  });
}

const Cart = () => {
  const [orderModal, setOrderModal] = useState(false);

  const [deleteStatus, setDeletedStatus] = useState("");
  const [cartList, setCartList] = useState([]);
  const cartInfo = (quant, id) => {
    let arr = [{ quant: quant, id: id }, ...cartList];
    setCartList((prev) => makeObjectsUnique(arr, "id"));
  };

  function setDeletedStatusFunc() {
    setDeletedStatus(true);
  }
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });
  console.log(userLogin);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (userLogin.id != "") {
      axios
        .post("http://127.0.0.1:8000/api/cart-by-id", { id: userLogin.id })
        .then((response) => {
          setDeletedStatus("");
          console.log(response);
          setProducts(
            setProductsForCart(
              response.data.product,
              response.data.cart_pr,
              response.data.category
            )
          );

          dispatch(
            add_cart_item({
              items: response.data.product,
              cart: response.data.cart_pr,
              category: response.data.category,
            })
          );
        });
    }
  }, [dispatch, userLogin.id, deleteStatus]);

  let total = 0;

  const goToCheckout = (e) => {
    e.preventDefault();
    if (userLogin.id === "") {
      nav("/signin");
    } else {
      setOrderModal(true);
      // nav("/orderpage");
    }
  };
  const closeModal = () => {
    setOrderModal(false);
  };

  return (
    <>
      <div>
        <div className="w-100">
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${
              orderModal ? "block" : "hidden"
            } overflow-y-auto overflow-x-hidden left-[-0.5%] fixed md:top-[20%] md:left-[35%] md:translate-x-[0%] md:translate-y-[0%] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
          >
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h1 className="text-lg font-semibold text-green-600">
                        Success!
                      </h1>
                      <button
                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                        onClick={closeModal}
                      >
                        &times;
                      </button>
                    </div>
                    <div className="p-4 md:p-5">
                      <p>Your checkout was successful. Thank you!</p>
                    </div>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ********************************* */}
          <div className="items-center py-24 bg-pink font-poppins dark:bg-gray-700">
            <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 lg:px-6">
              <h2 className="mb-10 text-4xl font-bold text-center dark:text-gray-200">
                My Cart
              </h2>
              <div className=" px-6 mb-10 lg:px-0 flex flex-wrap justify-between">
                {products.map((product) => {
                  let singleProductPrice = product.price * product.quantity;
                  console.log(singleProductPrice);
                  total += singleProductPrice;
                  return (
                    <CartProduct
                      cartInfo={cartInfo}
                      proQuantity={product.proQuant}
                      status={setDeletedStatusFunc}
                      category={product.catname}
                      quantity={product.quantity}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      temp_id={product.temp_id}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginTop: "50px" }}>
                  <Link
                    to={"/"}
                    className="flex-1 flex items-center justify-center rounded-md border text-black hover:border-pink-600 hover:text-pink-600 px-6 py-3 text-lg font-medium shadow-md"
                  >
                    ← Back to Shop
                  </Link>
                </div>

                <div className="border-t border-gray-200 px-4 py-4 sm:px-6 flex flex-col items-start w-1/3 ml-auto">
                  <div className="flex justify-between text-lg font-medium text-gray-900 w-full">
                    <p>Total</p>
                    <p>Rs. {total}</p>
                  </div>
                  <div className="mt-6 w-full">
                    <Link
                      to="/orderpage"
                      onClick={(e) => goToCheckout(e)}
                      className="w-full md:w-[70%] flex items-center justify-center rounded-md bg-gradient-to-r from-pink-300 to-pink-400 hover:opacity-90 text-white px-6 py-3 text-lg font-medium shadow-md mb-4"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
