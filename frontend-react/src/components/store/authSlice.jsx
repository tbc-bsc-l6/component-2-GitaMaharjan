// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // Perform login logic here (you can use JWT, set user in state, etc.)
      // For simplicity, we're just setting a dummy user for demonstration
      state.user = { email: action.payload.email };
    },
    logout: (state) => {
      // Perform logout logic here
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
