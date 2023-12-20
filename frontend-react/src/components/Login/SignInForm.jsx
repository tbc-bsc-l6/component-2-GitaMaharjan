import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";


const SignInForm = () => {
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

    console.log("The form was submitted with the following data:");
    console.log(formData);

    axios.post("http://127.0.0.1:8000/api/loginuser",{
      email:formData.email,
      password:formData.password
    }).then((response)=>{
      console.log(response);
    })
    

  };


  return (
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
           {/* <button className="formFieldLink" onClick={navigateToSignUp}>
            Create an account
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
