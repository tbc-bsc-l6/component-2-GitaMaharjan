import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signin: [createEmptyUser(), createEmptyUser()],
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
      const index = loginUser.type === "customer" ? 0 : 1;
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
