import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  add_cart,
  add_cart_item,
  add_message,
} from "../../authentication/CartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const userLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [quantityMessage, setQuantityMessage] = useState("");
  const { id } = useParams();

  const changeQuantityIncrement = (e) => {
    if (product.productquantity > quantity) {
      setQuantity(quantity + 1);
      setQuantityMessage("");
    } else {
      setQuantityMessage("dangermessage2");
    }
  };

  const changeQuantityDecrement = (e) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setQuantityMessage("");
    } else {
      setQuantityMessage("dangermessage1");
    }
  };

  useEffect(() => {
    async function get_single_product_only() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/get_single_product",
          { id: id, loginid: userLogin.id }
        );
        if (response.data.result == "user_id") {
          setProduct({
            productname: response.data.product.name,
            productprice: response.data.product.price,
            productquantity: response.data.product.quantity,
            productdescription: response.data.product.description,
            productcategory: response.data.category.name,
            productdiscount: response.data.product.discount_id,
            productimage: response.data.product.image,
            pcartquant: response.data.cart_pr.quantity,
            ptemp_id: response.data.cart_pr.id,
          });
          setQuantity(response.data.cart_pr.quantity);
        } else {
          setProduct({
            productid: response.data.product.id,
            productname: response.data.product.name,
            productprice: response.data.product.price,
            productquantity: response.data.product.quantity,
            productdescription: response.data.product.description,
            productcategory: response.data.category.name,
            productdiscount: response.data.product.discount_id,
            productimage: response.data.product.image,
            pcartquant: 1,
          });
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }
    get_single_product_only();
  }, [userLogin.id, id]);

  const saveToCart = (e) => {
    console.log(userLogin);
    if (userLogin.fullname != "") {
      axios
        .post("http://127.0.0.1:8000/api/add-to-cart", {
          pro_id: id,
          quantity: quantity,
          cust_id: userLogin.id,
          add: quantity,
        })
        .then((response) => {
          if (response.data.repeat == true) {
            dispatch(add_message({ mess: "added_success" }));
          } else {
            dispatch(add_cart({ items: 1 }));
            dispatch(
              add_cart_item({
                items: [response.data.result[0]],
                cart: [response.data.cart_pr[0]],
                category: [response.data.cart_pr[0]],
              })
            );
            nav("/cartpage", { state: "redirect" });
            dispatch(add_message({ mess: "added_success" }));
          }
        });
    } else {
      nav("/signin");
    }
  };
  // const priceAfterDiscount=product.productprice-((product.productprice*product.discount_id))
  return (
    <section className="overflow-hidden bg-pink dark:bg-gray-800 py-11 font-poppins">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 w-full md:w-1/2">
          <div className="relative w-full h-96 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000/images/${product.productimage}`}
              alt=""
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-300">
            {product.productname}
          </h2>
          <p className="text-base md:text-lg mb-6 text-gray-600 dark:text-gray-400">
            {product.productdescription}
          </p>
          <div className="flex items-center mb-6">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-300">
              Rs. {product.productprice}
            </p>
            {/* <p className="text-base font-normal text-gray-500 line-through dark:text-gray-400 ml-4">
          {product.productprice}
        </p> */}
          </div>
          <p className="text-green-600 dark:text-green-300">
            Available: {product.productquantity} items
          </p>

          <div className="w-32 mb-6">
            <label
              htmlFor=""
              className="text-lg font-semibold text-gray-800 dark:text-gray-300"
            >
              Quantity
            </label>
            <div className="relative flex flex-row w-full h-10 mt-2 bg-transparent rounded-lg">
              <button
                onClick={(e) => changeQuantityDecrement(e)}
                className="w-1/3 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 hover:bg-gray-400"
              >
                <span className="m-auto text-xl font-thin">-</span>
              </button>
              <input
                type="number"
                className="flex items-center font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                placeholder={quantity}
              />
              <button
                onClick={(e) => changeQuantityIncrement(e)}
                className="w-1/3 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400"
              >
                <span className="m-auto text-xl font-thin">+</span>
              </button>
            </div>
          </div>

          <div
            className={`${
              quantityMessage !== "" ? "flex" : "hidden"
            } items-center p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 1a9 9 0 100 18 9 9 0 000-18zM9 12a1 1 0 012 0v2a1 1 0 01-2 0v-2zm2-7a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span className="font-medium">
              {`${
                quantityMessage === "dangermessage1"
                  ? "Cart cannot contain less than 1 item"
                  : "Cart cannot contain more items than in stock"
              }`}
            </span>
          </div>

          <div className="flex items-center mb-8">
            <button
              onClick={saveToCart}
              className="flex items-center justify-center w-full md:w-auto p-3 text-white bg-blue-500 rounded-md dark:text-gray-200 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
