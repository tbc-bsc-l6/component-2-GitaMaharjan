import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlicer from "../authentication/authSlice";
import productSlicer from "../authentication/productSlice";
import categorySlicer from "../authentication/categorySlice";

const reducers = combineReducers({
  authReducer: authSlicer,
  productReducer: productSlicer,
  categoryReducer: categorySlicer,
});
export const ReduxStore = configureStore({
  reducer: reducers,
});
