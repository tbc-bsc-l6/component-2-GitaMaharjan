import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlicer from "../authentication/authSlice";
import productSlicer from "../authentication/productSlice";
import categorySlicer from "../authentication/categorySlice";
import cartSlicer from "../authentication/CartSlice";

const reducers = combineReducers({
  authReducer: authSlicer,
  productReducer: productSlicer,
  categoryReducer: categorySlicer,
  cartReducer: cartSlicer,
});
export const ReduxStore = configureStore({
  reducer: reducers,
});
