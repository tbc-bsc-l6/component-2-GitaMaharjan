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
  filter: [
    {
      name: "",
      price: "",
      quantity: "",
      description: "",
      category: "",
      discount: "",
      created_at: "",
    },
  ],
  cart_items: [
    {
      items: 0,
    },
  ],
  cart_products: [],
  message: "",
};

function makeObjectsUnique(arr, property) {
  const uniqueValues = new Set();
  return arr.filter((obj) => {
    if (!uniqueValues.has(obj[property])) {
      uniqueValues.add(obj[property]);
      return true;
    }
    return false;
  });
}
export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    add_cart: (state, action) => {
      state.cart_items[0].items =
        state.cart_items[0].items + action.payload.items;
    },
    add_message: (state, action) => {
      state.message = action.payload.mess;
    },
    delete_cart_item: (state, action) => {
      state.cart_products = state.cart_products.filter((item, i) => {
        return item.temp_id != action.payload.id;
      });
    },
    add_cart_item: (state, action) => {
      const newPro = action.payload.items;
      const cartPro = action.payload.cart;
      console.log(cartPro);
      const categories = action.payload.category;
      let cartTotal = [];
      newPro.forEach((pro, i) => {
        let id = pro["id"];
        let image = pro["image"];
        let quantity = cartPro[i]["quantity"];
        let temp_id = cartPro[i]["id"];
        let name = pro["name"];
        let description = pro["description"];
        let discount = pro["discount_id"];
        let price = pro["price"];
        let category_id = pro["category_id"];
        let catname = categories[i]["name"];
        cartTotal.push({
          id: id,
          image: image,
          quantity: quantity,
          name: name,
          description: description,
          discount: discount,
          price: price,
          category_id: category_id,
          catname: catname,
          temp_id: temp_id,
        });
      });
      let setArr = [...new Set([...state.cart_products, ...cartTotal])];
      state.cart_products = makeObjectsUnique(setArr, "id");
    },
  },
});

export const {
  add_cart,
  add_cart_item,
  delete_cart_item,
  add_message,
} = cartSlice.actions;

export default cartSlice.reducer;
