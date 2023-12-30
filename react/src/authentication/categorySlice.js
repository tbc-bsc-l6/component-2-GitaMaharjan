import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  category: [
    {
      name: "",
      description: "",
      image: "",
      date: "",
    },
  ],
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    add_category: (state, action) => {
      let totalCategory = action.payload;
      totalCategory.forEach((element) => {
        element["nanoid"] = nanoid();
      });
      state.category = totalCategory;
    },
    update_category: (state, action) => {},

    add_message: (state, action) => {
      state.message = action.payload.mess;
    },
  },
});

export const {
  add_category,
  delete_category,
  update_category,
  add_message,
} = categorySlice.actions;

export default categorySlice.reducer;
