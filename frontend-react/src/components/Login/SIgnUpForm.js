import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import logo from "../../assets/images/logo.png";
import axios from "axios";

import {
  useSelector,
  useDispatch,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { loginUser } from "../store/authSlice";

const SignUpForm = () => {
  const dispatch = useDispatch();

  let isLogin = useSelector((state) => {
    return state.authReducer.signin[0];
  });

  //router navigate
  const navigate = useNavigate();

  //basic states for data
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState({
    status: "",
    color: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    hasAgreed: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear validation error for the changed field
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Please enter your full name";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Please enter your email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.hasAgreed) {
      newErrors.hasAgreed = "Please agree to the terms of service";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("The form was submitted with the following data:");
      console.log(formData);

      axios
        .post("http://127.0.0.1:8000/api/registeruser", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log(response);
          dispatch(
            loginUser({
              name: formData.name,
              email: email,
              token: response.data.api_token,
              type: "customer",
            })
          );
          localStorage.setItem("loginItem", response.api_token);
          navigate("/");
          setFullname("");
          setEmail("");
          setPassword("");
          setCpassword("");
          setStatus({ status: response.data.message, color: "blue-700" });
          navigate("/login");
        });
    } else {
      setStatus({ status: "Some of the fields are empty", color: "red-700" });
    }
  };

  return isLogin.token != "" ? (
    <Navigate to="/" />
  ) : (
    <div className="app formCenter">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logoImage" />
      </div>
      <form onSubmit={handleSubmit} className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="formFieldInput"
            placeholder="Enter your full name"
            name="name"
            value={formData.name}
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
          <label className="formFieldLabel" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            id="cpassword"
            className="formFieldInput"
            placeholder="Enter your password again"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
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
          <label className="formFieldCheckboxLabel">
            <input
              className="formFieldCheckbox"
              type="checkbox"
              name="hasAgreed"
              value={formData.hasAgreed}
              onChange={handleChange}
            />{" "}
            I agree all statements in{" "}
            <a href="null" className="formFieldTermsLink">
              terms of service
            </a>
          </label>
        </div>

        <div className="formField">
          <button className="formFieldButton">Sign Up</button>{" "}
          <Link to="/login" className="formFieldLink">
            I'm already a member
          </Link>
          {/* <button className="formFieldLink" onClick={navigateToSignIn}>
            I am already a member
          </button> */}
        </div>
      </form>
    </div>
  );
};

const styles = {
  errorMessage: {
    backgroundColor: "red",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
    position: "relative",
    top: "10px",
  },
};

export default SignUpForm;
