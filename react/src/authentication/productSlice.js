import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      discount: "",
      created_at: "",
      image: "",
    },
  ],
  message: "",
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      let totalProduct = action.payload;
      totalProduct.forEach((element) => {
        element["nanoid"] = nanoid();
      });
      state.products = totalProduct;
    },
    deleteProduct: (state, action) => {
      let products = state.products;
      let id = action.payload.id;
      state.products = products.filter((pro) => {
        return pro.id != id;
      });
    },
    updateProduct: (state, action) => {},

    addMessage: (state, action) => {
      state.message = action.payload.mess;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  addMessage,
} = productsSlice.actions;

export default productsSlice.reducer;
