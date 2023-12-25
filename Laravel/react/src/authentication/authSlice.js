//********************************************************************** */
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: {
//     customer: createEmptyUser(),
//     managerAdmin: createEmptyUser(),
//     mainAdmin: createEmptyUser(),
//   },
// };

// function createEmptyUser() {
//   return {
//     fullname: "",
//     email: "",
//     token: "",
//     image: "",
//     type: "",
//   };
// }

// export const authSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     loginUser: (state, action) => {
//       const loginUser = action.payload;
//       state.users[loginUser.type.toLowerCase()] = loginUser;
//     },
//     logoutUser: (state, action) => {
//       const userType = action.payload;
//       state.users[userType.toLowerCase()] = createEmptyUser();
//     },
//   },
// });

// export const { loginUser, logoutUser } = authSlice.actions;

// export default authSlice.reducer;

// ******************************************************************************************************

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  signin: [createEmptyUser(), createEmptyUser(), createEmptyUser()],
};

function createEmptyUser() {
  return {
    fullname: "",
    email: "",
    token: "",
    image: "",
    type: "",
  };
}

export const authSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const loginUser = action.payload;
      // const index = loginUser.type === "customer" ? 0 : 1;
      const index =
        loginUser.type === "customer" ? 0 : loginUser.type === "admin" ? 1 : 2;

      state.signin[index] = loginUser;
    },
    logoutUser: (state) => {
      state.signin[0] = createEmptyUser();
    },
    logoutUserAdmin: (state) => {
      state.signin[1] = createEmptyUser();
    },
  },
});

export const { loginUser, logoutUser, logoutUserAdmin } = authSlice.actions;

export default authSlice.reducer;
// ******************************************************************************************************
