import React, { useEffect } from "react";
import CircularColor from "../trial/CircularColor";
import { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import NoProductsFound from "./NoProductsFound";

function Search() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState([]);
  const { slug } = useParams();
  const productCount = product.length;

  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/api/get_searched_product", {
        search: slug,
      })
      .then((response) => {
        console.log(response);
        setProduct(response.data.products);
        setLoading(false);
      });
  });

  return (
    <div>
      <Header />
      {loading ? (
        <CircularColor />
      ) : productCount > 0 ? (
        <div className="grid grid-cols-1 ml-10 mr-10 mb-10 md:grid-cols-2 lg:grid-cols-3 l:grid-cols-3 ">
          {product.map((item, id) => (
            <div key={id} className="mt-2">
              <div className="group group-hover:bg-opacity-60 transition duration-500 relative bg-gray-50  w-300  sm:p-15 py-20 px-10 flex justify-center items-center rounded-lg border border-gray-300">
                <div
                  style={{
                    width: "100%",
                    height: "200px", // Set a specific height for the image container
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                  }}
                >
                  <Link to={`/productdetail/${item.id}`}>
                    <img
                      style={{
                        width: "100%",
                        height: "100%", // Occupy the full height of the container
                        objectFit: "cover", // Maintain aspect ratio and cover the container
                      }}
                      src={`http://127.0.0.1:8000/images/${item.image}`}
                      alt="sofa-2"
                      className="group-hover:opacity-60 transition duration-500"
                    />
                  </Link>
                </div>
                <div className="absolute sm:top-8 top-4 left-4 sm:left-8 flex justify-start items-start flex-col space-y-2">
                  <div>
                    <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p
                      className="group-hover:opacity-60 transition duration-500 text-xl font-semibold leading-5 text-gray-800"
                      style={{ marginTop: "250px" }}
                    >
                      Rs. {item.price}
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-col bottom-8 left-8 space-y-4 absolute opacity-0 group-hover:opacity-100 transition duration-500"
                  style={{ marginLeft: "250px" }}
                >
                  <button>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM15 13H13V15C13 15.2652 12.8946 15.5196 12.7071 15.7071C12.5196 15.8946 12.2652 16 12 16C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V13H9C8.73479 13 8.48043 12.8946 8.2929 12.7071C8.10536 12.5196 8 12.2652 8 12C8 11.7348 8.10536 11.4804 8.2929 11.2929C8.48043 11.1054 8.73479 11 9 11H11V9C11 8.73478 11.1054 8.48043 11.2929 8.29289C11.4804 8.10536 11.7348 8 12 8C12.2652 8 12.5196 8.10536 12.7071 8.29289C12.8946 8.48043 13 8.73478 13 9V11H15C15.2652 11 15.5196 11.1054 15.7071 11.2929C15.8946 11.4804 16 11.7348 16 12C16 12.2652 15.8946 12.5196 15.7071 12.7071C15.5196 12.8946 15.2652 13 15 13Z"
                        fill="#1F2937"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoProductsFound />
      )}
      <Footer />
    </div>
  );
}

export default Search;
