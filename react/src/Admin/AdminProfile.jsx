import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../authentication/authSlice";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logout = () => {
    localStorage.setItem("token", "");
    dispatch(
      logoutUser({ fullname: "", email: "", token: "", image: "", type: "" })
    );

    nav("/home");
  };
  let loginData = useSelector((state) => {
    return state.authReducer.signin[1];
  });
  return (
    <div>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {loginData.fullname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {loginData.email}
          </span>
        </div>
        <button
          className="border bg-blue-400 text-white bottom-2 p-3"
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
