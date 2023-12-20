import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";
import { useNavigate,useSelector,useDispatch } from "react-router-dom";
import {loginUser} from "./authentication";
import { Navigate } from 'react-router-dom';




const SignInForm = () => {

  const [load1,setLoad] = useState(true);
  const navigate = useNavigate();

  let isLogin = useSelector((state)=>{
    return state.auth.signin[0];
  })
  const dispatch = useDispatch();



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoad(true);

    console.log("The form was submitted with the following data:");
    console.log(formData);

    axios.post("http://127.0.0.1:8000/api/loginuser",{
      email:formData.email,
      password:formData.password
    }).then((response)=>{
      if(response.data.status==="true"){
        // setStatus({status: response.data.message, color: "blue-700"});
        dispatch(loginUser({fullname: response.data.fullname, email: formData.email, token: response.data.api_token,  type: "customer"}));
        localStorage.setItem('loginItem', response.data.api_token);
        navigate("/");
      }else{
        setLoad(false);

      } 
      })
    

  };


  return (
    isLogin.token !== "" ? <Navigate to="/"/> : <div className='w-[100%] -z-20 mt-16 mb-16'>

    <div className="app formCenter">
      <div className="logoContainer">
        <img
          src={logo} 
          alt="Logo"
          className="logoImage"
        />
      </div>
      <form className="formFields" onSubmit={handleSubmit}>
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign In</button>{" "}
          <Link to="/signup" className="formFieldLink">
            Create an account
          </Link>

        </div>
      </form>
    </div>
    </div>

  );
};

export default SignInForm;
