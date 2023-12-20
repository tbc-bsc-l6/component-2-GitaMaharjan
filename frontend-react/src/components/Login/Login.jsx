import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SIgnUpForm";

import "./Login.css";

const Login = () => {
  const [activeForm, setActiveForm] = useState("sign-up");

  const switchToSignUp = () => {
    setActiveForm("sign-up");
  };

  const switchToSignIn = () => {
    setActiveForm("sign-in");
  };

  return (
    <div className="App">
      <div className="appAside"> 
        <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
        <p className="asideText">Why sign up? Get connected and more!</p>
      </div>

      <div className="appForm">
        <div className="pageSwitcher">
          <button
            onClick={switchToSignIn}
            className={`pageSwitcherItem ${
              activeForm === "sign-in" ? "pageSwitcherItem-active" : ""
            }`}
          >
            Sign In
          </button>
          <button
            onClick={switchToSignUp}
            className={`pageSwitcherItem ${
              activeForm === "sign-up" ? "pageSwitcherItem-active" : ""
            }`}
          >
            Sign Up
          </button>
        </div>

        {activeForm === "sign-up" && <SignUpForm />}
        {activeForm === "sign-in" && <SignInForm />}
      </div>
    </div>
  );
};

export default Login;
