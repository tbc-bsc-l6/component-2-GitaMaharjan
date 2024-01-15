import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate, Navigate, redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [vars, setVar] = useState({
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_description: "",
    product_category: "",
    product_discount: "",
    product_image: null,
  });

  console.log(vars);

  const [image, setImage] = useState(null);
  console.log(image);
  const changeImage = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    let isMounted = true;
    async function get_single_product_only() {
      if (id != null) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/get_single_product",
            { id: id },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          if (isMounted) {
            // Update state or refs only if the component is still mounted
            setVar({
              product_name: response.data.product.product_name,
              product_price: response.data.product.product_price,
              product_quantity: response.data.product.product_quantity,
              product_description: response.data.product.product_description,
              product_category: response.data.product.product_category,
              product_discount: response.data.product.product_discount,
              product_image: response.data.product.product_image,
            });
          }
        } catch (error) {
          console.error("Error fetching product details:", error);
          // Handle error if needed
        }
      }
    }
    get_single_product_only();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const [catmodal, setCatModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [updateCat, setUpdateCat] = useState(false);

  const submitProduct = (e) => {
    e.preventDefault();
    if (
      vars.product_name != "" &&
      vars.product_price != "" &&
      vars.product_quantity != "" &&
      vars.product_description != "" &&
      vars.product_category != "" &&
      vars.product_discount != ""
    ) {
      let userdata = new FormData();
      userdata.append("product_name", vars.product_name);
      userdata.append("product_price", vars.product_price);
      userdata.append("product_quantity", vars.product_quantity);
      userdata.append("product_description", vars.product_description);
      userdata.append("product_category", vars.product_category);
      userdata.append("product_discount", vars.product_discount);
      userdata.append("pid", id);
      userdata.append("product_image", image ? image : "");
      // console.log(userdata);
      // try{
      axios
        .post("http://127.0.0.1:8000/api/update-products", userdata, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((response) => {
          // if(response.data.status===true){
          console.log(response);
          navigate("/dashboard/products");
        });
    }
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/get-categories").then((response) => {
      // console.log(response);
      let arrPro = response.data.allcat;
      setCategory(arrPro);
    });
  }, [updateCat]);
  // const getTotal = useRef(null);

  const [total, setTotal] = useState(0);

  const [cats, setCat] = useState({
    cname: "",
    cdesc: "",
  });

  const addCat = (e) => {
    e.preventDefault();
    let userdata = {
      name: cats.cname,
      description: cats.cdesc,
    };
    if (cats.cname != "" && cats.cdesc != "") {
      axios
        .post("http://127.0.0.1:8000/api/add-categories", userdata)
        .then((response) => {
          // console.log(response);
          setUpdateCat(!updateCat);
          // setCatModal(false);
        });
    }
  };
  const changeField = (e) => {
    if (e.target.name === "pcat" && e.target.value === "new") {
      // setCatModal(true);
    } else {
      setVar({ ...vars, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (!isNaN(vars.product_price) && !isNaN(vars.product_quantity)) {
      setTotal(Number(vars.product_price) * Number(vars.product_quantity));
    }
  }, [vars.product_price, vars.product_quantity]);
  // const changeCatValue = (e) => {
  //   setCat({ ...cats, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <div>
        <div className="max-w-xl bg-pink rounded-lg overflow-hidden shadow-md p-6">
          <form
            onSubmit={(e) => {
              submitProduct(e);
            }}
          >
            <div className="mb-6">
              <p className="text-xl font-bold">Edit Product</p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="productName"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Product Name
              </label>
              <input
                value={vars.product_name}
                name="product_name"
                onChange={(e) => {
                  changeField(e);
                }}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="productName"
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-6 flex">
              <div className="w-1/2 pr-3">
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Price
                </label>
                <input
                  value={vars.product_price}
                  name="product_price"
                  onInput={(e) => {
                    changeField(e);
                  }}
                  placeholder="Enter product price"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="productPrice"
                  type="number"
                  required
                />
              </div>

              <div className="w-1/2 pl-3">
                <label
                  htmlFor="productQuantity"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <input
                  value={vars.product_quantity}
                  name="product_quantity"
                  onInput={(e) => {
                    changeField(e);
                  }}
                  id="productQuantity"
                  type="number"
                  placeholder="Enter product quantity"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="productDescription"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                name="product_description"
                value={vars.product_description}
                onChange={(e) => {
                  changeField(e);
                }}
                rows={5}
                id="productDescription"
                placeholder="Enter product description"
                className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                required
              />
            </div>
            <div className="mb-6 flex">
              <div className="mb-6">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  name="product_image"
                  onInput={(e) => {
                    changeImage(e);
                  }}
                  id="productImage"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="discount"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Discount(%)
                </label>
                <input
                  value={vars.product_discount}
                  onChange={(e) => {
                    changeField(e);
                  }}
                  name="product_discount"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="discount"
                  type="number"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Select category
              </label>
              <div className="relative">
                <select
                  value={vars.product_category}
                  onChange={(e) => {
                    changeField(e);
                  }}
                  name="product_category"
                  className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="category"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {category.map((cat, index) => {
                    return (
                      <option
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        key={index}
                        value={cat["id"]}
                      >
                        {cat["name"]}
                      </option>
                    );
                  })}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6 mt-8">
              <button
                type="submit"
                className=" w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
