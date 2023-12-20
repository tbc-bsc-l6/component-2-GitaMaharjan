// import React, { useState } from "react";
// import SignInForm from "./SignInForm";
// import SignUpForm from "./SgnUpForm";
// import logo from "../../assets/images/logo.png";
// import "./Login.css";

// const Login = () => {
//   const [activeForm, setActiveForm] = useState("sign-in");

//   const switchToSignUp = () => {
//     setActiveForm("sign-up");
//   };

//   const switchToSignIn = () => {
//     setActiveForm("sign-in");
//   };

//   return (
//     <div className="login-container">
//       <div className="logo-container">
//         <img src={logo} alt="Logo" />
//       </div>
//       {activeForm === "sign-in" && <SignInForm />}
//       {activeForm === "sign-up" && <SignUpForm />}
//       <div className="switch-form">
//         {activeForm === "sign-in" ? (
//           <p>
//             Don't have an account?{" "}
//             <span onClick={switchToSignUp}>Create new account</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={switchToSignIn}>Sign In</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
