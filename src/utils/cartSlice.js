import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "CartSlice",
  initialState: {
    cartData: JSON.parse(localStorage.getItem("cart")) || [],
    restInfo: JSON.parse(localStorage.getItem("restInfo")) || []
  },
  reducers: {
    addToCart: (state, actions) => {
      const { info,restInfo } = actions.payload;
      // console.log(info,restInfo);
      
      // setCartData(prev=>[...prev,info]);
      state.cartData = [...state.cartData, info];
      state.restInfo = restInfo
      localStorage.setItem("cart", JSON.stringify(state.cartData));
      localStorage.setItem("restInfo", JSON.stringify(state.restInfo));
    },
    clearCart: (state) => {
      state.cartData = []
      state.restInfo = []
      localStorage.removeItem("cart");
      localStorage.removeItem("restInfo");
    },
    deleteItem: (state, actions) => {
      state.cartData = actions.payload;
      localStorage.setItem("cart", JSON.stringify(actions.payload));
    },
  },
});

export const { addToCart, clearCart, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
