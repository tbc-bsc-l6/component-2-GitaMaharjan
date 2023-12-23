import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlicer from "../authentication/authSlice";

const reducers = combineReducers({
  authReducer: authSlicer,
});
export const ReduxStore = configureStore({
  reducer: reducers,
});
